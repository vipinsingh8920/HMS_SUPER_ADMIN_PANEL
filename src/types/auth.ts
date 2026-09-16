export type SuperAdmin = {
  id: number;
  name: string;
  email: string;
  role: "SUPER_ADMIN";
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    admin: SuperAdmin;
  };
};