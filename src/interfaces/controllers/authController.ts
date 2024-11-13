import { Request, Response, NextFunction } from 'express';
import { LoginUser } from '../../application/use-cases/loginUser';
import { UserRepositoryImpl } from '../../infrastructure/repositories/userRepositoryImpl';

const userRepository = new UserRepositoryImpl();
const loginUser = new LoginUser(userRepository);

export class AuthController {
    static async login(req: Request, res: Response, _next: NextFunction): Promise<Response> {
      const { email, password } = req.body;
  
      const result = await loginUser.execute(email, password);
  
      if (result.error) {
        return res.status(401).json({ message: result.error });
      }
  
      return res.json(result);
    }
}
