// src/tests/services/ListCarService.test.ts
import mongoose from 'mongoose';
import ListCarService from '../../../modules/cars/services/ListCarService';
import CarsRepository from '../../../modules/cars/repositories/CarsRepository';
import { ICar } from '../../../modules/cars/models/Car';
import AppError from '@shared/errors/AppError';

type CarData = {
  model: string;
  color: string;
  year: number;
  value_per_day: number;
  accessories: { description: string }[];
  number_of_passengers: number;
};

describe('ListCarService', () => {
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

  it('should list all cars when there are cars in the database', async () => {
    const carData1: CarData = {
      model: 'Tesla Model S',
      color: 'Black',
      year: 2021,
      value_per_day: 200,
      accessories: [{ description: 'GPS' }, { description: 'Sunroof' }],
      number_of_passengers: 4,
    };

    const carData2: CarData = {
      model: 'Honda Civic',
      color: 'Blue',
      year: 2019,
      value_per_day: 120,
      accessories: [{ description: 'Air Conditioning' }],
      number_of_passengers: 5,
    };

    await CarsRepository.createCar({
      ...carData1,
      accessories: carData1.accessories.map(acc => ({ _id: '66897f23673776f0cdc95030', description: acc.description })),
    });

    await CarsRepository.createCar({
      ...carData2,
      accessories: carData2.accessories.map(acc => ({ _id: '66897f29338b1d32a1eb7f0f', description: acc.description })),
    });

    const listCarService = new ListCarService();
    const cars = await listCarService.findAll();

    expect(cars.length).toBe(2);
    expect(cars[0].model).toBe('Tesla Model S');
    expect(cars[1].model).toBe('Honda Civic');
  });

  it('should return an empty array when there are no cars in the database', async () => {
    const listCarService = new ListCarService();
    const cars = await listCarService.findAll();

    expect(cars.length).toBe(0);
  });
});
