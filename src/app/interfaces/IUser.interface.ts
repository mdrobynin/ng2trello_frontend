export interface IUser {
  Id: number;
  Username: string;
  Role: string;
  Email?: string;
  AvatarUrl?: string;
  Description?: string;
  Preferences?: string[];
}
