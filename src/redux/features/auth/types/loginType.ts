export type SigninPayload = {
  email: string;
  password: string;
};

export interface AuthResponse {
  data: AuthData;
}

interface AuthData {
  auth: Sign;
  user: SignedUser;
}

interface Sign {
  session_id: string;
  access_token: string;
  access_token_expires_at: number;
  refresh_token: string;
  refresh_token_expires_at: number;
}

export interface SignedUser {
  full_name: string;
  email: string;
  role: string;
}
