import { Router } from 'express';
import usersRoutes from "@modules/users/routes/users.routes";
import carsRoutes from '@modules/cars/routes/cars.routes';
import reserveRoutes from '@modules/reserves/routes/reserves.routes'

const routes = Router();


routes.use('/api/v1', usersRoutes);
routes.use('/api/v1', carsRoutes)
routes.use('/api/v1', reserveRoutes)

export default routes;