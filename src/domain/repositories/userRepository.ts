export interface UserRepository {
    authenticate(email: string, password: string): Promise<{ id: string; role: string } | null>;
  }