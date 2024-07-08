import { Model } from 'mongoose';
import { IUser } from '../models/User';
import AppError from '../../../shared/errors/AppError';

interface PaginationOptions {
  page: number;
  limit: number;
}

interface PaginationResult {
  users: IUser[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  nextPage?: string | null;
  prevPage?: string | null;
}

export default class ListUserService {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async listUsers(options: PaginationOptions): Promise<PaginationResult> {
    try {
      const { page, limit } = options;
      const skip = (page - 1) * limit;

      // Busca os usuários na página atual
      const users = await this.userModel.find()
        .skip(skip)
        .limit(limit)
        .exec();

 
      const totalUsers = await this.userModel.countDocuments();

    
      const totalPages = Math.ceil(totalUsers / limit);

     
      const result: PaginationResult = {
        users,
        currentPage: page,
        totalPages,
        totalUsers,
      };

      
      if (page < totalPages) {
        result.nextPage = `/api/users?page=${page + 1}&limit=${limit}`;
      }
      if (page > 1) {
        result.prevPage = `/api/users?page=${page - 1}&limit=${limit}`;
      }

      return result;
    } catch (error) {
      throw new AppError(`Erro ao listar usuários:`);
    }
  }
}
