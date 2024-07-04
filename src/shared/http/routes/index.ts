import { Router } from 'express';
import usersRoutes from "@modules/users/routes/users.routes";
import carsRoutes from '@modules/cars/routes/cars.routes';


const routes = Router();


routes.use('/api/v1', usersRoutes);
routes.use('/api/v1', carsRoutes)


export default routes;