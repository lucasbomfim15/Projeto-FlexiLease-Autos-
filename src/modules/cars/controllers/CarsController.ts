import { Request, Response } from 'express';
import CarsRepository from '../repositories/CarsRepository';
import AppError from '@shared/errors/AppError';
import { Car } from '../models/Car'
import CreateCarService from '../services/CreateCarService';
import ListCarService from '../services/ListCarService';
import ShowCarService from '../services/ShowCarService';
import UpdateCarService from '../services/UpdateCarService';
import DeleteCarService from '../services/DeleteCarService';
import UpdateCarAccessoryService from '../services/UpdateCarAccessorieService';


export default class CarsController {

    async create(req: Request, res: Response){
        const createCar = new CreateCarService()
        try{
            if(!req.body){
                throw new AppError('Dados do carro não fornecidos.');
            }

            const newCar = await createCar.execute(req.body);
            res.status(201).json(newCar)
        }catch (error){
         res.status(400).json({ error: new AppError('Falha ao criar o Carro ') });
        }
    }

    async listCars(req: Request, res: Response){
        const listAllCars = new ListCarService();
        try {
          const cars = await listAllCars.findAll();
          return res.status(200).json(cars);
        } catch (error) {
          console.error(error);
          return res.status(400).json({ message: 'Falha ao listar os carros' });
        }
    }

    async show(req: Request, res: Response){
        try{
            const { id } = req.params;
            const showCar = new ShowCarService()
    
            const car = await showCar.findById(id)
            res.status(200).json(car);
           
        }catch(error){
            res.status(500).json({ error: 'Erro ao encontrar o carro' });
        }
    
    }

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
          return res.status(400).json({ message: 'Falha ao atualizar o carro' });
        }
      }

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
          return res.status(400).json({ message: 'Falha ao deletar o carro' });
        }
      }

      public async updateCarAccessory(req: Request, res: Response): Promise<Response> {
        const { id: car_id } = req.params;
        const { _id: accessory_id, description } = req.body;
    
        const updateCarAccessoryService = new UpdateCarAccessoryService();
    
        await updateCarAccessoryService.execute({ car_id, accessory_id, description });
    
        return res.status(200).json({ message: 'Accessory updated or removed successfully' });
      }



}