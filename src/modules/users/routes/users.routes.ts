import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import authMiddleware from '@shared/middlewares/authMiddleware';

const usersRoutes = Router();
const usersController = new UsersController();
const authController = new AuthController

usersRoutes.post('/users', usersController.createUser)
usersRoutes.get('/users', authMiddleware, usersController.listUsers)
usersRoutes.get('/users/:id', usersController.show)
usersRoutes.delete('/users/:id', usersController.delete)
usersRoutes.put('/users/:id', usersController.update)

usersRoutes.post('/auth', authController.authenticate);


export default usersRoutes;