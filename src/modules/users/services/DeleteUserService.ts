import { Model } from 'mongoose';
import { IUser } from '../models/User'; // Importe a interface IUser e o modelo de usuário aqui
import AppError from '../../../shared/errors/AppError';

export default class DeleteUserService {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async deleteUserById(id: string): Promise<IUser | null> {
    try {
      if (!id) {
        throw new AppError('ID do usuário não fornecido', 400);
      }

      const deletedUser = await this.userModel.findByIdAndDelete(id);

      if (!deletedUser) {
        throw new AppError('Usuário não encontrado', 404);
      }

      return deletedUser;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Erro ao deletar usuário pelo ID', 500);
    }
  }
}