import {Router} from 'express'
import CarsController from '../controllers/CarsController'

const carsRoutes = Router();
const carsController = new CarsController();

carsRoutes.post('/cars',  carsController.create);
carsRoutes.get('/cars', carsController.listCars)
carsRoutes.get('/cars/:id', carsController.show)
carsRoutes.delete('/cars/:id', carsController.deleteCar)
carsRoutes.put('/cars/:id', carsController.updateCar)
carsRoutes.put('/cars/:id/accessories', carsController.updateCarAccessory);


export default carsRoutes;