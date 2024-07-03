import { Model } from 'mongoose';
import { IUser } from '../models/User'; // Importe a interface IUser e o modelo de usuário aqui
import AppError from '@shared/errors/AppError';

export default class DeleteUserService {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async deleteUserById(id: string): Promise<IUser | null> {
    try {
      if (!id) {
        throw new Error('ID do usuário não fornecido');
      }

      

      const deletedUser = await this.userModel.findByIdAndDelete(id);

      return deletedUser;
    } catch (error) {
      throw new AppError(`Erro ao deletar usuário pelo ID`);
    }
  }

  // Outros métodos de serviço, como listUsers, createUser, updateUser, etc., podem ser adicionados aqui conforme necessário
}
