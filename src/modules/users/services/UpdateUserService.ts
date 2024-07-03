import { Model } from 'mongoose';
import { IUser } from '../models/User';
import AppError from '@shared/errors/AppError';

export default class UpdateUserService {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async updateUserById(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    try {
      if (!id) {
        throw new Error('ID do usuário não fornecido');
      }

      const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, { new: true });

      return updatedUser;
    } catch (error) {
      throw new AppError(`Erro ao atualizar usuário pelo ID`);
    }
  }

}
