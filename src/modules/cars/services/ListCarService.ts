import { v4 as uuidv4 } from 'uuid';
import CarsRepository from '../repositories/CarsRepository';
import { ICar } from '../models/Car';
import AppError from '@shared/errors/AppError';


export default class ListCarService {

    public async findAll(): Promise<ICar[]> {
        return await CarsRepository.listCars();
      }
      
}