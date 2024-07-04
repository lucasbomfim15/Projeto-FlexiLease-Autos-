import { ICar } from '../models/Car';
import CarsRepository from '../repositories/CarsRepository';
import AppError from '@shared/errors/AppError';

interface IUpdateRequest {
  model?: string;
  color?: string;
  year?: number;
  value_per_day?: number;
  accessories?: { _id: string, description: string }[];
  number_of_passengers?: number;
}

class UpdateCarService {
  public async execute(id: string, carData: IUpdateRequest): Promise<ICar | null> {
    if (carData.year && (carData.year < 1950 || carData.year > 2023)) {
      throw new AppError('The car year must be between 1950 and 2023.', 400);
    }

    const updatedCar = await CarsRepository.updateCar(id, carData);

    if (!updatedCar) {
      throw new AppError('Car not found', 404);
    }

    return updatedCar;
  }
}

export default UpdateCarService;
