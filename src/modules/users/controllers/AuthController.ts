import { Request, Response } from 'express';
import AuthServices from '../services/AuthServices';

export default class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUser = new AuthServices();

    try {
      const { user, token } = await authenticateUser.execute({ email, password });
      return res.json({ user, token });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error:'Failed to authenticate user' });
    }
  }
}
