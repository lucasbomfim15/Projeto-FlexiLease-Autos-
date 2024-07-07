import { Model } from 'mongoose';
import { IUser } from '../models/User';
import AppError from '../../../shared/errors/AppError';

export default class ShowUserService {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async findUserById(id: string): Promise<IUser | null> {
    if (!id) {
      throw new AppError('ID do usuário não fornecido', 400);
    }

    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new AppError('Usuário não encontrado', 404); 
      }
      return user;
    } catch (error) {
      throw new AppError('Usuário não encontrado', 500); 
    }
  }
}
