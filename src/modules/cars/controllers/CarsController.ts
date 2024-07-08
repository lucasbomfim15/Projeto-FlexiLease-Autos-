import { Request, Response } from 'express';
import CarsRepository from '../repositories/CarsRepository';
import AppError from '../../../shared/errors/AppError';
import { Car } from '../models/Car';
import CreateCarService from '../services/CreateCarService';
import ListCarService from '../services/ListCarService';
import ShowCarService from '../services/ShowCarService';
import UpdateCarService from '../services/UpdateCarService';
import DeleteCarService from '../services/DeleteCarService';
import UpdateCarAccessoryService from '../services/UpdateCarAccessorieService';

export default class CarsController {
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
  async create(req: Request, res: Response) {
    const createCar = new CreateCarService();
    try {
      const newCar = await createCar.execute(req.body);
      res.status(201).json(newCar);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Failed to create car' });
    }
  }

  /**
   * @swagger
   * /api/v1/cars:
   *   get:
   *     summary: List all cars
   *     tags: [Cars]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of cars
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Car'
   *       400:
   *         description: Failed to list cars
   */
  async listCars(req: Request, res: Response) {
    const listAllCars = new ListCarService();
    try {
      const cars = await listAllCars.findAll();
      return res.status(200).json(cars);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Failed to list cars' });
    }
  }

  /**
   * @swagger
   * /api/v1/cars/{id}:
   *   get:
   *     summary: Get a car by ID
   *     tags: [Cars]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The car ID
   *     responses:
   *       200:
   *         description: The car data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Car'
   *       404:
   *         description: Car not found
   */
  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const showCar = new ShowCarService();

      const car = await showCar.findById(id);
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ error: 'Error finding the car' });
    }
  }

  /**
   * @swagger
   * /api/v1/cars/{id}:
   *   put:
   *     summary: Update a car by ID
   *     tags: [Cars]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The car ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
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
   *                     _id:
   *                       type: string
   *                     description:
   *                       type: string
   *               number_of_passengers:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Car updated successfully
   *       404:
   *         description: Car not found
   */
  async updateCar(req: Request, res: Response) {
    const { id } = req.params;
    const carData = req.body;
    const updateCar = new UpdateCarService();

    try {
      const updatedCar = await updateCar.execute(id, carData);
      return res.status(200).json(updatedCar);
    } catch (error) {
      console.error(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Failed to update car' });
    }
  }

  /**
   * @swagger
   * /api/v1/cars/{id}:
   *   delete:
   *     summary: Delete a car by ID
   *     tags: [Cars]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The car ID
   *     responses:
   *       200:
   *         description: Car deleted successfully
   *       404:
   *         description: Car not found
   */
  async deleteCar(req: Request, res: Response) {
    const { id } = req.params;
    const deleteCar = new DeleteCarService();

    try {
      const deletedCar = await deleteCar.deleteById(id);
      return res.status(200).json(deletedCar);
    } catch (error) {
      console.error(error);
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(400).json({ message: 'Failed to delete car' });
    }
  }

  /**
   * @swagger
   * /api/v1/cars/{id}/accessories:
   *   put:
   *     summary: Update a car accessory
   *     tags: [Cars]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The car ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               _id:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       200:
   *         description: Accessory updated successfully
   *       404:
   *         description: Car or accessory not found
   */
  public async updateCarAccessory(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const { _id: accessory_id, description } = req.body;

    const updateCarAccessoryService = new UpdateCarAccessoryService();

    try {
      await updateCarAccessoryService.execute({ car_id, accessory_id, description });
      return res.status(200).json({ message: 'Accessory updated or removed successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update accessory' });
    }
  }
}
