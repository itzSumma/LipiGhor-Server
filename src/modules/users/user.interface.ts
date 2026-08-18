export type UserRole = 'USER' | 'ADMIN';

export interface IUser {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
