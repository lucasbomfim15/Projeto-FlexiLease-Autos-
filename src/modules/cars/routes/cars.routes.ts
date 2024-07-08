import {Router} from 'express'
import CarsController from '../controllers/CarsController'
import authMiddleware from '@shared/middlewares/authMiddleware';

const carsRoutes = Router();
const carsController = new CarsController();

carsRoutes.post('/cars', authMiddleware, carsController.create);
carsRoutes.get('/cars', authMiddleware, carsController.listCars)
carsRoutes.get('/cars/:id',  authMiddleware, carsController.show)
carsRoutes.delete('/cars/:id',  authMiddleware, carsController.deleteCar)
carsRoutes.put('/cars/:id', authMiddleware, carsController.updateCar)
carsRoutes.put('/cars/:id/accessories', authMiddleware, carsController.updateCarAccessory);


export default carsRoutes;