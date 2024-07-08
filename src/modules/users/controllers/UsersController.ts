import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ShowUserService from '../services/ShowUserService';
import ListUserService from '../services/ListUserService';
import AppError from '../../../shared/errors/AppError';
import { User } from "../models/User";
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {

  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - cpf
   *               - birth
   *               - email
   *               - password
   *               - cep
   *               - qualified
   *             properties:
   *               name:
   *                 type: string
   *               cpf:
   *                 type: string
   *               birth:
   *                 type: string
   *                 format: date
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               cep:
   *                 type: string
   *               qualified:
   *                 type: string
   *     responses:
   *       201:
   *         description: User created successfully
   *       400:
   *         description: Invalid input
   */

  async createUser(req: Request, res: Response) {
    const createUser = new CreateUserService();
    try {
      const newUser = await createUser.execute(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error:  'Failed to create user' });
    }
  }

   /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     summary: List all users
   *     tags: [Users]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: Page number
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Number of users per page
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 users:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/User'
   *                 pagination:
   *                   type: object
   *                   properties:
   *                     currentPage:
   *                       type: integer
   *                     totalPages:
   *                       type: integer
   *                     totalUsers:
   *                       type: integer
   *                     nextPage:
   *                       type: integer
   *                     prevPage:
   *                       type: integer
   */

  async listUsers(req: Request, res: Response): Promise<void> {
    const listUser = new ListUserService(User);
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
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

   /**
   * @swagger
   * /api/v1/users/{id}:
   *   get:
   *     summary: Get a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The user ID
   *     responses:
   *       200:
   *         description: The user data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   */

  async show(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const showUser = new ShowUserService(User);

      const user = await showUser.findUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao encontrar usuário' });
    }
  }

   /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     summary: Delete a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The user ID
   *     responses:
   *       200:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   */

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleteUser = new DeleteUserService(User);

      const deletedUser = await deleteUser.deleteUserById(id);
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }

   /**
   * @swagger
   * /api/v1/users/{id}:
   *   put:
   *     summary: Update a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The user ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: User updated successfully
   *       404:
   *         description: User not found
   */

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
