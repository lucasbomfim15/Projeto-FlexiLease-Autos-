import { Router } from 'express';
import usersRoutes from "@modules/users/routes/users.routes";


const routes = Router();


routes.use('/api/v1', usersRoutes);


export default routes;