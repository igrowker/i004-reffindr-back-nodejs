import jwt from 'jsonwebtoken'
import { env } from '../../shared/config/env'

export class JwtService {
  static generateToken(payload: object): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' })
  }
}
