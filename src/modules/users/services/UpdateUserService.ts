import { Model } from 'mongoose';
import { IUser } from '../models/User';
import AppError from '../../../shared/errors/AppError';

export default class UpdateUserService {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async updateUserById(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    if (!id) {
      throw new AppError('ID do usuário não fornecido', 400); 
    }

    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, { new: true });
      if (!updatedUser) {
        throw new AppError('Usuário não encontrado', 404);
      }
      return updatedUser;
    } catch (error) {
      throw new AppError('Erro ao atualizar usuário pelo ID', 500); 
    }
  }
}
