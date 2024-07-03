import { sign } from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';
import { IUser } from '../models/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

class AuthServices {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await UsersRepository.findUserByEmail(email);
    if (!user) {
      throw new AppError('Combinação de email/senha incorreta.', 401);
    }

    if (user.password !== password) {
      throw new AppError('Combinação de email/senha incorreta.', 401);
    }

    const token = sign({ id: user._id }, process.env.JWT_SECRET || 'defaultSecret', {
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthServices;
