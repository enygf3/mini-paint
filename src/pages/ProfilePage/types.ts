export interface AuthState {
  auth: {
    user: {
      email: string;
      displayName: string;
      photoURL: string;
    };
    isLoggedIn: boolean;
  };
}
