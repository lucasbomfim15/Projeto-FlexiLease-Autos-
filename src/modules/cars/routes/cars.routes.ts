import {Router} from 'express'
import CarsController from '../controllers/CarsController'
import authMiddleware from '@shared/middlewares/authMiddleware';

const carsRoutes = Router();
const carsController = new CarsController();

/**
   * @swagger
   * /api/v1/cars:
   *   post:
   *     summary: Create a new car
   *     tags: [Cars]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - model
   *               - color
   *               - year
   *               - value_per_day
   *               - accessories
   *               - number_of_passengers
   *             properties:
   *               model:
   *                 type: string
   *               color:
   *                 type: string
   *               year:
   *                 type: integer
   *               value_per_day:
   *                 type: number
   *               accessories:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     description:
   *                       type: string
   *               number_of_passengers:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Car created successfully
   *       400:
   *         description: Invalid input
   */

carsRoutes.post('/cars', authMiddleware, carsController.create);
carsRoutes.get('/cars', authMiddleware, carsController.listCars)
carsRoutes.get('/cars/:id',  authMiddleware, carsController.show)
carsRoutes.delete('/cars/:id',  authMiddleware, carsController.deleteCar)
carsRoutes.put('/cars/:id', authMiddleware, carsController.updateCar)
carsRoutes.put('/cars/:id/accessories', authMiddleware, carsController.updateCarAccessory);


export default carsRoutes;