// src/tests/services/UpdateCarService.test.ts
import mongoose from 'mongoose';
import UpdateCarService from '../../../modules/cars/services/UpdateCarService';
import CarsRepository from '../../../modules/cars/repositories/CarsRepository';
import { ICar } from '../../../modules/cars/models/Car';
import AppError from '../../../shared/errors/AppError';

describe('UpdateCarService', () => {
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

  it('should update a car by ID', async () => {
    const carData: Omit<ICar, '_id'> = {
      model: 'Toyota Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 150,
      accessories: [{ _id: '1', description: 'Leather Seats' }, { _id: '2', description: 'Sunroof' }],
      number_of_passengers: 5,
    };

    const createdCar = await CarsRepository.createCar({
      ...carData,
      accessories: carData.accessories.map(acc => ({ _id: acc._id, description: acc.description })),
    });

    const updateCarService = new UpdateCarService();
    const updatedCar = await updateCarService.execute(createdCar._id, { color: 'Blue' });

    expect(updatedCar).toBeTruthy();
    expect(updatedCar?._id).toStrictEqual(createdCar._id);
    expect(updatedCar?.color).toBe('Blue');
  });

  it('should throw an error when car year is out of range', async () => {
    const carData: Omit<ICar, '_id'> = {
      model: 'Toyota Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 150,
      accessories: [{ _id: '1', description: 'Leather Seats' }, { _id: '2', description: 'Sunroof' }],
      number_of_passengers: 5,
    };

    const createdCar = await CarsRepository.createCar({
      ...carData,
      accessories: carData.accessories.map(acc => ({ _id: acc._id, description: acc.description })),
    });

    const updateCarService = new UpdateCarService();

    try {
      await updateCarService.execute(createdCar._id, { year: 1949 });
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('The car year must be between 1950 and 2023.');
        expect(error.statusCode).toBe(400);
      } else {
        throw error; 
      }
    }
  });

  it('should throw an error when car ID is not found', async () => {
    const updateCarService = new UpdateCarService();

    try {
      await updateCarService.execute('60c72b2f9b1e8b001c8e4c5a', { color: 'Blue' });
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('Car not found');
        expect(error.statusCode).toBe(404);
      } else {
        throw error; 
      }
    }
  });
});
