// src/tests/services/DeleteCarService.test.ts
import mongoose from 'mongoose';
import DeleteCarService from '../../../modules/cars/services/DeleteCarService';
import CarsRepository from '../../../modules/cars/repositories/CarsRepository';
import { ICar } from '../../../modules/cars/models/Car';
import AppError from '../../../shared/errors/AppError';

describe('DeleteCarService', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://bmfmlucas:Q1IPVdaQJAj39pdc@flexilease-api.fszu1nf.mongodb.net/?retryWrites=true&w=majority&appName=flexilease-api');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }
  });

  it('should delete a car by ID', async () => {
    const carData: Omit<ICar, '_id'> = {
      model: 'Toyota Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 150,
      accessories: [{ _id: '668981a6aadf9b11b44a39f4', description: 'Leather Seats' }, { _id: '668981ab21b85972b9f77359', description: 'Sunroof' }],
      number_of_passengers: 5,
    };

    const createdCar = await CarsRepository.createCar({
      ...carData,
      accessories: carData.accessories.map(acc => ({ _id: '668981b4389f162901486045', description: acc.description })),
    });

    const deleteCarService = new DeleteCarService();
    const deletedCar = await deleteCarService.deleteById(createdCar._id);

    expect(deletedCar).toBeTruthy();
    expect(deletedCar?._id).toStrictEqual(createdCar._id);
  });

  it('should throw an error when car ID is not provided', async () => {
    const deleteCarService = new DeleteCarService();

    try {
      await deleteCarService.deleteById('');
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('ID do Carro não fornecido');
      } else {
        throw error; // Re-lançar erro se não for do tipo esperado
      }
    }
  });

  it('should throw an error when car is not found', async () => {
    const deleteCarService = new DeleteCarService();

    try {
      await deleteCarService.deleteById('60c72b2f9b1e8b001c8e4c5a'); // ID inválido ou não existente
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('Erro ao encontrar o carro pelo ID');
      } else {
        throw error; // Re-lançar erro se não for do tipo esperado
      }
    }
  });
});
