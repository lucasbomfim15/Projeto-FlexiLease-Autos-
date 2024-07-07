import { v4 as uuidv4 } from 'uuid';

import { ICar } from '../models/Car';
import AppError from '../../../shared/errors/AppError';
import CarsRepository from '../repositories/CarsRepository';


interface IRequest {
  model: string;
  color: string;
  year: number;
  value_per_day: number;
  accessories: { description: string }[];
  number_of_passengers: number;
}

class CreateCarService {


    
  public async execute({
    model,
    color,
    year,
    value_per_day,
    accessories,
    number_of_passengers,
  }: IRequest): Promise<ICar> {

   
    if (year < 1950 || year > 2023) {
      throw new AppError('The car year must be between 1950 and 2023.', 400);
    }

   
    if (accessories.length === 0) {
      throw new AppError('A car must have at least one accessory.', 400);
    }

  
    const uniqueAccessories = new Set(accessories.map(acc => acc.description));
    if (uniqueAccessories.size !== accessories.length) {
      throw new AppError('Accessories must be unique.', 400);
    }

    
    const car = await CarsRepository.createCar({
      model,
      color,
      year,
      value_per_day,
      accessories: accessories.map(acc => ({ _id: uuidv4(), description: acc.description })),
      number_of_passengers,
    });

    return car;
  }
}

export default CreateCarService;
