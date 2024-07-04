import { v4 as uuidv4 } from 'uuid';
import CarsRepository from '../repositories/CarsRepository';
import { ICar } from '../models/Car';
import AppError from '@shared/errors/AppError';


export default class ShowCarService{

    public async findById(id: string): Promise<ICar | null> {
        try {
            if (!id) {
              throw new Error('ID do Carro não fornecido');
            }
      
            const car = await CarsRepository.findCarById(id);
            return car;

          } catch (error) {
            throw new AppError(`Erro ao encontrar o carro pelo ID`);
          }
      }


}