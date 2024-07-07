// src/tests/services/CreateCarService.test.ts
import mongoose from 'mongoose';
import CreateCarService from '../../../modules/cars/services/CreateCarService';
import CarsRepository from '../../../modules/cars/repositories/CarsRepository';
import AppError from '../../../shared/errors/AppError';

type CarData = {
  model: string;
  color: string;
  year: number;
  value_per_day: number;
  accessories: { description: string }[];
  number_of_passengers: number;
};

describe('CreateCarService', () => {
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

  it('should create a car with valid data', async () => {
    const carData: CarData = {
      model: 'Tesla Model 3',
      color: 'Red',
      year: 2022,
      value_per_day: 150,
      accessories: [{ description: 'GPS' }, { description: 'Air Conditioning' }],
      number_of_passengers: 4,
    };

    const createCarService = new CreateCarService();
    const car = await createCarService.execute(carData);

    expect(car).toHaveProperty('_id');
    expect(car.model).toBe('Tesla Model 3');
    expect(car.accessories.length).toBe(2);
    expect(car.accessories[0]).toHaveProperty('description', 'GPS');
  });

  it('should throw an error if the car year is out of range', async () => {
    const carData: CarData = {
      model: 'Vintage Car',
      color: 'Blue',
      year: 1940, // Invalid year
      value_per_day: 80,
      accessories: [{ description: 'Radio' }],
      number_of_passengers: 2,
    };

    const createCarService = new CreateCarService();

    try {
      await createCarService.execute(carData);
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('The car year must be between 1950 and 2023.');
      } else {
        throw error; // Re-lançar erro se não for do tipo esperado
      }
    }
  });

  it('should throw an error if no accessories are provided', async () => {
    const carData: CarData = {
      model: 'Modern Car',
      color: 'Black',
      year: 2022,
      value_per_day: 120,
      accessories: [], // No accessories
      number_of_passengers: 5,
    };

    const createCarService = new CreateCarService();

    try {
      await createCarService.execute(carData);
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('A car must have at least one accessory.');
      } else {
        throw error; // Re-lançar erro se não for do tipo esperado
      }
    }
  });

  it('should throw an error if accessories are not unique', async () => {
    const carData: CarData = {
      model: 'Family Car',
      color: 'White',
      year: 2023,
      value_per_day: 100,
      accessories: [{ description: 'Sunroof' }, { description: 'Sunroof' }], // Duplicate accessories
      number_of_passengers: 5,
    };

    const createCarService = new CreateCarService();

    try {
      await createCarService.execute(carData);
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('Accessories must be unique.');
      } else {
        throw error; // Re-lançar erro se não for do tipo esperado
      }
    }
  });
});
