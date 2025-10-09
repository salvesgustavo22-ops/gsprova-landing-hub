/**
 * Supabase helper functions and utilities
 *
 * This file contains reusable helper functions for working with Supabase
 * in edge functions and client-side code.
 */

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates Brazilian phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone format
 */
export function isValidPhone(phone) {
  const phoneRegex = /^(\+55\s?)?(\d{2}\s?)?\d{4,5}[-\s]?\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * Sanitizes string input to prevent XSS attacks
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
    .substring(0, 1000); // Limit length
}

/**
 * Creates a standardized error response
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @param {Object} details - Additional error details
 * @returns {Response} JSON error response
 */
export function createErrorResponse(message, status = 400, details = {}) {
  return new Response(
    JSON.stringify({
      error: true,
      message,
      details,
      timestamp: new Date().toISOString(),
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

/**
 * Creates a standardized success response
 * @param {Object} data - Response data
 * @param {number} status - HTTP status code
 * @returns {Response} JSON success response
 */
export function createSuccessResponse(data, status = 200) {
  return new Response(
    JSON.stringify({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

/**
 * Validates required fields in an object
 * @param {Object} data - Data object to validate
 * @param {Array<string>} requiredFields - Array of required field names
 * @returns {Array<string>} Array of missing field names
 */
export function validateRequiredFields(data, requiredFields) {
  const missing = [];

  for (const field of requiredFields) {
    if (!data || !data[field] || data[field].toString().trim() === '') {
      missing.push(field);
    }
  }

  return missing;
}

/**
 * Gets client IP from request headers
 * @param {Request} request - Request object
 * @returns {string} Client IP address
 */
export function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return real || clientIP || 'unknown';
}

/**
 * Rate limiting helper using in-memory store
 * Note: In production, use Redis or similar for distributed rate limiting
 */
const rateLimitStore = new Map();

/**
 * Implements basic rate limiting
 * @param {string} key - Unique identifier for rate limit (IP, user ID, etc)
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} True if request should be allowed
 */
export function checkRateLimit(key, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, []);
  }

  const requests = rateLimitStore.get(key);

  // Remove expired requests
  const validRequests = requests.filter(timestamp => timestamp > windowStart);

  if (validRequests.length >= maxRequests) {
    return false;
  }

  // Add current request
  validRequests.push(now);
  rateLimitStore.set(key, validRequests);

  return true;
}

/**
 * Generates a random correction ID
 * @param {string} prefix - Prefix for the ID (G for GS Aprova, E for External)
 * @returns {string} Generated correction ID
 */
export function generateCorrectionId(prefix = 'G') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}${timestamp}${random}`.toUpperCase();
}

/**
 * Validates file upload parameters
 * @param {File} file - File to validate
 * @param {Array<string>} allowedTypes - Allowed MIME types
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {Object} Validation result with isValid and errors
 */
export function validateFileUpload(file, allowedTypes = [], maxSize = 5 * 1024 * 1024) {
  const errors = [];

  if (!file) {
    errors.push('No file provided');
    return { isValid: false, errors };
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }

  if (file.size > maxSize) {
    errors.push(`File size ${file.size} exceeds maximum size ${maxSize}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
