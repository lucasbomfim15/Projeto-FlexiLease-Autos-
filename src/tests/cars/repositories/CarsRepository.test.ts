import mongoose from 'mongoose';
import CarsRepository from '../../../modules/cars/repositories/CarsRepository'; // Caminho relativo ajustado
import { Car, ICar, IAccessory } from '../../../modules/cars/models/Car';

type CarData = {
  model: string;
  color: string;
  year: number;
  value_per_day: number;
  accessories: IAccessory[];
  number_of_passengers: number;
};

describe('CarsRepository', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://bmfmlucas:Q1IPVdaQJAj39pdc@flexilease-api.fszu1nf.mongodb.net/?retryWrites=true&w=majority&appName=flexilease-api');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Limpeza do banco de dados sem usar dropDatabase
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }
  });

  it('should create a car', async () => {
    const carData: CarData = {
      model: 'Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 100,
      accessories: [{ _id:'66897b5a2158f2aa60fc8965', description: 'Air Conditioning' }],
      number_of_passengers: 5,
    };

    const car = await CarsRepository.createCar(carData);
    expect(car).toHaveProperty('_id');
    expect(car.model).toBe('Corolla');
  });

  it('should update a car', async () => {
    const car = new Car({
      model: 'Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 100,
      accessories: [{ _id: '66897b644fae07885f243fd7', description: 'Air Conditioning' }],
      number_of_passengers: 5,
    });
    await car.save();

    const updatedCar = await CarsRepository.updateCar(car._id, { model: 'Camry' });
    expect(updatedCar).toBeTruthy();
    expect(updatedCar?.model).toBe('Camry');
  });

  it('should delete a car', async () => {
    const car = new Car({
      model: 'Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 100,
      accessories: [{ _id: '66897b713a43d40edf3e9778', description: 'Air Conditioning' }],
      number_of_passengers: 5,
    });
    await car.save();

    const deletedCar = await CarsRepository.deleteCar(car._id);
    expect(deletedCar).toBeTruthy();
    expect(await CarsRepository.findCarById(car._id)).toBeNull();
  });

  it('should find a car by id', async () => {
    const car = new Car({
      _id: new mongoose.Types.ObjectId(),
      model: 'Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 100,
      accessories: [{ _id: '66897b79b96f598cfe6e287f', description: 'Air Conditioning' }],
      number_of_passengers: 5,
    });
    await car.save();

    const foundCar = await CarsRepository.findCarById(car._id);
    expect(foundCar).toBeTruthy();
    expect(foundCar?.model).toBe('Corolla');
  });

  it('should list all cars', async () => {
    const car1 = new Car({
      model: 'Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 100,
      accessories: [{ _id: '66897b7f63b20de5038b7ca5', description: 'Air Conditioning' }],
      number_of_passengers: 5,
    });
    const car2 = new Car({
      model: 'Civic',
      color: 'Blue',
      year: 2019,
      value_per_day: 80,
      accessories: [{ _id: '66897b854acedc5da8939169', description: 'GPS' }],
      number_of_passengers: 4,
    });
    await car1.save();
    await car2.save();

    const cars = await CarsRepository.listCars();
    expect(cars.length).toBe(2);
  });

  it('should update a car accessory', async () => {
    const accessory: IAccessory = {
      _id: '66897b8f39230b29db267176',
      description: 'Air Conditioning',
    };

    const car = new Car({
      model: 'Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 100,
      accessories: [{ _id: '66897b959a42893cecab4244', description: 'GPS' }],
      number_of_passengers: 5,
    });
    await car.save();

    const updatedCar = await CarsRepository.updateCarAccessory(car._id, accessory);
    expect(updatedCar).toBeTruthy();
    expect(updatedCar?.accessories.length).toBe(2);
    expect(updatedCar?.accessories.some(acc => acc.description === 'Air Conditioning')).toBe(true);
  });
});
