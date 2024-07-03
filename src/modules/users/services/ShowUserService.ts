import { Model } from 'mongoose';
import { IUser, User } from '../models/User';
import AppError from '@shared/errors/AppError';

export default class ShowUserService {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async findUserById(id: string): Promise<IUser | null> {
    try {
      if (!id) {
        throw new Error('ID do usuário não fornecido');
      }

    

      const user = await this.userModel.findById(id);

      return user;
    } catch (error) {
      throw new AppError(`Erro ao encontrar usuário pelo ID`);
    }
  }

}
