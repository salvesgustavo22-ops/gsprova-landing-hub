export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      essays: {
        Row: {
          bank: Database["public"]["Enums"]["correction_bank"]
          bank_other: string | null
          correction_file_path: string | null
          correction_id: string | null
          corrector_comments: string | null
          created_at: string
          data_protection_accepted: boolean
          data_protection_ip: unknown | null
          data_protection_location: string | null
          data_protection_timestamp: string | null
          downloaded_at: string | null
          essay_file_path: string
          geolocation: string | null
          id: string
          ip_address: unknown | null
          is_revision: boolean
          origin: Database["public"]["Enums"]["essay_origin"]
          proposal_file_path: string | null
          revision_corrected_at: string | null
          revision_essay_file_path: string | null
          revision_submitted_at: string | null
          status: Database["public"]["Enums"]["essay_status"]
          theme_title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bank: Database["public"]["Enums"]["correction_bank"]
          bank_other?: string | null
          correction_file_path?: string | null
          correction_id?: string | null
          corrector_comments?: string | null
          created_at?: string
          data_protection_accepted?: boolean
          data_protection_ip?: unknown | null
          data_protection_location?: string | null
          data_protection_timestamp?: string | null
          downloaded_at?: string | null
          essay_file_path: string
          geolocation?: string | null
          id?: string
          ip_address?: unknown | null
          is_revision?: boolean
          origin: Database["public"]["Enums"]["essay_origin"]
          proposal_file_path?: string | null
          revision_corrected_at?: string | null
          revision_essay_file_path?: string | null
          revision_submitted_at?: string | null
          status?: Database["public"]["Enums"]["essay_status"]
          theme_title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bank?: Database["public"]["Enums"]["correction_bank"]
          bank_other?: string | null
          correction_file_path?: string | null
          correction_id?: string | null
          corrector_comments?: string | null
          created_at?: string
          data_protection_accepted?: boolean
          data_protection_ip?: unknown | null
          data_protection_location?: string | null
          data_protection_timestamp?: string | null
          downloaded_at?: string | null
          essay_file_path?: string
          geolocation?: string | null
          id?: string
          ip_address?: unknown | null
          is_revision?: boolean
          origin?: Database["public"]["Enums"]["essay_origin"]
          proposal_file_path?: string | null
          revision_corrected_at?: string | null
          revision_essay_file_path?: string | null
          revision_submitted_at?: string | null
          status?: Database["public"]["Enums"]["essay_status"]
          theme_title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          lead_type: string
          message: string | null
          name: string
          phone: string
          service_selected: string | null
          source: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          lead_type: string
          message?: string | null
          name: string
          phone: string
          service_selected?: string | null
          source?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          lead_type?: string
          message?: string | null
          name?: string
          phone?: string
          service_selected?: string | null
          source?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          data_protection_accepted: boolean
          data_protection_ip: unknown | null
          data_protection_location: string | null
          data_protection_timestamp: string | null
          first_name: string
          id: string
          last_name: string
          phone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data_protection_accepted?: boolean
          data_protection_ip?: unknown | null
          data_protection_location?: string | null
          data_protection_timestamp?: string | null
          first_name: string
          id?: string
          last_name: string
          phone: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data_protection_accepted?: boolean
          data_protection_ip?: unknown | null
          data_protection_location?: string | null
          data_protection_timestamp?: string | null
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_correction_id: {
        Args: { essay_origin: Database["public"]["Enums"]["essay_origin"] }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      correction_bank: "enem" | "fuvest" | "vunesp" | "other"
      essay_origin: "gs_aprova" | "external"
      essay_status: "pending" | "corrected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      correction_bank: ["enem", "fuvest", "vunesp", "other"],
      essay_origin: ["gs_aprova", "external"],
      essay_status: ["pending", "corrected"],
    },
  },
} as const
