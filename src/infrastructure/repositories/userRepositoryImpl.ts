import httpClient from '../http/httpClient'
import { UserRepository } from '../../domain/repositories/userRepository'

export class UserRepositoryImpl implements UserRepository {
  async authenticate(
    email: string,
    password: string
  ): Promise<{ id: string; role: string } | null> {
    return httpClient
      .post('/api/auth/login', { email, password })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error authenticating user:', error)
        return null
      })
  }
}
