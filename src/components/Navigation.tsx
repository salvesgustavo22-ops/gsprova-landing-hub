import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useActiveSection } from "@/hooks/useActiveSection";
import { trackWhatsAppClick } from "@/lib/analytics";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Track active section for homepage
  const isHomePage = location.pathname === '/';
  const sectionIds = ['hero', 'services', 'testimonials', 'contact'];
  const activeSection = useActiveSection(sectionIds);

  // Primary navigation items (decision-critical)
  const primaryNavItems = [
    { name: "Home", path: "/", sectionId: "hero" },
    { name: "Services", path: "/#services", sectionId: "services" },
    { name: "Results", path: "/#testimonials", sectionId: "testimonials" }
  ];

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleCTAClick = () => {
    trackWhatsAppClick('navigation_cta', 'get_started');
    const message = encodeURIComponent("Oi, quero começar meus estudos agora. Vim pelo site GS Aprova.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  const handleContactClick = () => {
    if (isHomePage) {
      // Scroll to contact section if on homepage
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to contact page
      window.location.href = '/contato';
    }
    setIsOpen(false);
  };

  const isLinkActive = (item: typeof primaryNavItems[0]) => {
    if (isHomePage && item.sectionId) {
      return activeSection === item.sectionId;
    }
    return location.pathname === item.path;
  };

  const handleNavClick = (item: typeof primaryNavItems[0]) => {
    if (isHomePage && item.sectionId) {
      // Smooth scroll to section on homepage
      const section = document.getElementById(item.sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/81baf984-0517-4524-96a3-e84ec5d2c55d.png" 
              alt="GS Aprova Logo" 
              className="h-8 w-auto"
              width="64"
              height="32"
            />
            <span className="text-foreground font-bold text-lg" style={{fontFamily: 'Montserrat, sans-serif'}}>
              Curso GS Aprova
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {primaryNavItems.map((item) => {
              const isActive = isLinkActive(item);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavClick(item)}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive 
                      ? "text-primary" 
                      : "text-foreground hover:text-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                  {/* Active indicator */}
                  <span 
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform duration-200 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Button
                onClick={handleCTAClick}
                variant="default"
                size="sm"
                className="font-semibold"
                aria-label="Get started with GS Aprova"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85"
            role="menu"
            aria-labelledby="mobile-menu-button"
          >
            <div className="flex flex-col space-y-1">
              {/* Primary nav items */}
              {primaryNavItems.map((item) => {
                const isActive = isLinkActive(item);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => handleNavClick(item)}
                    className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
                      isActive 
                        ? "text-primary bg-primary/10" 
                        : "text-foreground hover:text-primary hover:bg-muted/50"
                    }`}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Contact as secondary item */}
              <button
                onClick={handleContactClick}
                className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 px-3 py-2 rounded-md text-left transition-colors"
                role="menuitem"
              >
                Contact
              </button>
              
              {/* Mobile CTA */}
              <div className="pt-2 border-t border-border mt-2">
                <Button
                  onClick={handleCTAClick}
                  variant="default"
                  size="sm"
                  className="w-full font-semibold"
                  aria-label="Get started with GS Aprova"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};