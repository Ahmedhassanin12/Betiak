export interface User {
  id: string;
  email: string;
}

export interface Session {
  access_token: string;
  user: User;
}