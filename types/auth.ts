export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  location: string;
  company: string;
  requestorId: string;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface AuthState {
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
}
