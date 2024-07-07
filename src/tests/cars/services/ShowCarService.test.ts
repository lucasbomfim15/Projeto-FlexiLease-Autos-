// src/tests/services/ShowCarService.test.ts
import mongoose from 'mongoose';
import ShowCarService from '../../../modules/cars/services/ShowCarService';
import CarsRepository from '../../../modules/cars/repositories/CarsRepository';
import { ICar } from '../../../modules/cars/models/Car';
import AppError from '../../../shared/errors/AppError';

type CarData = {
  model: string;
  color: string;
  year: number;
  value_per_day: number;
  accessories: { description: string }[];
  number_of_passengers: number;
};

describe('ShowCarService', () => {
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

  it('should find a car by ID', async () => {
    const carData: CarData = {
      model: 'Toyota Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 150,
      accessories: [{ description: 'Leather Seats' }, { description: 'Sunroof' }],
      number_of_passengers: 5,
    };

    const createdCar = await CarsRepository.createCar({
      ...carData,
      accessories: carData.accessories.map(acc => ({ _id: '6689809f77a5a24f5d0b9d59', description: acc.description })),
    });

    const showCarService = new ShowCarService();
    const foundCar = await showCarService.findById(createdCar._id);

    expect(foundCar).toBeTruthy();
    expect(foundCar?.model).toBe('Toyota Corolla');
    expect(foundCar?.color).toBe('Red');
  });

  it('should throw an error when car ID is not provided', async () => {
    const showCarService = new ShowCarService();

    try {
      await showCarService.findById('');
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('ID do Carro não fornecido');
      } else {
        throw error; 
      }
    }
  });

  it('should throw an error when car is not found', async () => {
    const showCarService = new ShowCarService();

    try {
      await showCarService.findById('60c72b2f9b1e8b001c8e4c5a'); 
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('Erro ao encontrar o carro pelo ID');
      } else {
        throw error; 
      }
    }
  });
});
