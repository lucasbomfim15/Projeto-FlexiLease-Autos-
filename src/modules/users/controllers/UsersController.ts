import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ShowUserService from '../services/ShowUserService';
import ListUserService from '../services/ListUserService';
import AppError from '../../../shared/errors/AppError';
import { User } from "../models/User";
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {

  async createUser(req: Request, res: Response) {
    const createUser = new CreateUserService();
    try {
      if (!req.body) {
        throw new AppError('Dados do usuário não fornecidos.');
      }

      const newUser = await createUser.execute(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: new AppError('failed to create user') });
    }
  }

  async listUsers(req: Request, res: Response): Promise<void> {
    const listUser = new ListUserService(User)
    try {

        const { page = 1, limit = 10 } = req.query; 
        const parsedPage = parseInt(page as string, 10);
        const parsedLimit = parseInt(limit as string, 10);
      
        const result = await listUser.listUsers({ page: parsedPage, limit: parsedLimit });
      res.status(200).json({
        users: result.users,
        pagination: {
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalUsers: result.totalUsers,
          nextPage: result.nextPage,
          prevPage: result.prevPage,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar usuarios' });
    }
  }

  async show(req: Request, res: Response): Promise<void>{
    try{
        const { id } = req.params;
        const showUser = new ShowUserService(User)

        const user = await showUser.findUserById(id)
        res.status(200).json(user);
       
    }catch(error){
        res.status(500).json({ error: 'Erro ao encontrar usuário' });
    }

  }


  async delete(req: Request, res: Response): Promise<void>{
    try{
        const { id } = req.params;
        const deleteUser = new DeleteUserService(User)

        const deleteduser = deleteUser.deleteUserById(id)
        res.status(200).json(deleteduser);
       
    }catch(error){
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData = req.body; 
      const userService = new UpdateUserService(User); 

      const updatedUser = await userService.updateUserById(id, userData);

      if (!updatedUser) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }
}
