export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthActionState {
  error?: string;
  success?: string;
}

export interface FormData {
  email: string;
  password: string;
  name?: string; // Optional for login
}
