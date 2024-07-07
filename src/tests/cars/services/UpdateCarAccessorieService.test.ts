// src/tests/services/UpdateCarAccessoryService.test.ts
import mongoose from 'mongoose';
import UpdateCarAccessoryService from '../../../modules/cars/services/UpdateCarAccessorieService';
import { Car, ICar, IAccessory } from '../../../modules/cars/models/Car';
import AppError from '../../../shared/errors/AppError';

describe('UpdateCarAccessoryService', () => {
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

  it('should update an accessory of a car', async () => {
    const carData: Omit<ICar, '_id'> = {
      model: 'Toyota Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 150,
      accessories: [{ _id: '1', description: 'Leather Seats' }, { _id: '2', description: 'Sunroof' }],
      number_of_passengers: 5,
    };

    const createdCar = await Car.create({
      ...carData,
      accessories: carData.accessories.map(acc => ({ _id: acc._id, description: acc.description })),
    });

    const updateCarAccessoryService = new UpdateCarAccessoryService();
    await updateCarAccessoryService.execute({
      car_id: createdCar._id,
      accessory_id: '1',
      description: 'Leather Seats (Updated)',
    });

    const updatedCar = await Car.findById(createdCar._id);

    expect(updatedCar).toBeTruthy();
    expect(updatedCar?.accessories.length).toBe(2);
    const updatedAccessory = updatedCar?.accessories.find(acc => acc._id === '1');
    expect(updatedAccessory?.description).toBe('Leather Seats (Updated)');
  });

  it('should throw an error when car is not found', async () => {
    const updateCarAccessoryService = new UpdateCarAccessoryService();

    try {
      await updateCarAccessoryService.execute({
        car_id: '60c72b2f9b1e8b001c8e4c5a',
        accessory_id: '1',
        description: 'Leather Seats (Updated)',
      });
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('Car not found');
        expect(error.statusCode).toBe(404);
      } else {
        throw error; // Re-lançar erro se não for do tipo esperado
      }
    }
  });

  it('should throw an error when accessory is not found', async () => {
    const carData: Omit<ICar, '_id'> = {
      model: 'Toyota Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 150,
      accessories: [{ _id: '1', description: 'Leather Seats' }, { _id: '2', description: 'Sunroof' }],
      number_of_passengers: 5,
    };

    const createdCar = await Car.create({
      ...carData,
      accessories: carData.accessories.map(acc => ({ _id: acc._id, description: acc.description })),
    });

    const updateCarAccessoryService = new UpdateCarAccessoryService();

    try {
      await updateCarAccessoryService.execute({
        car_id: createdCar._id,
        accessory_id: '3', // Accessory ID that doesn't exist
        description: 'Leather Seats (Updated)',
      });
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('Accessory not found');
        expect(error.statusCode).toBe(404);
      } else {
        throw error; // Re-lançar erro se não for do tipo esperado
      }
    }
  });
});
