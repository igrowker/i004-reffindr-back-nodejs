import { UserRepository } from '../../domain/repositories/userRepository';
import { JwtService } from '../../infrastructure/auth/jwtService';

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<{ token?: string; error?: string }> {
    const user = await this.userRepository.authenticate(email, password);
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const token = JwtService.generateToken({ id: user.id, role: user.role });
    return { token };
  }
}