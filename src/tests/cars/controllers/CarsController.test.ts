
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import CarsController from '../../../modules/cars/controllers/CarsController';
import { Car } from '../../../modules/cars/models/Car';

const app = express();
app.use(bodyParser.json());

const carsController = new CarsController();

app.post('/cars', (req, res) => carsController.create(req, res));
app.get('/cars', (req, res) => carsController.listCars(req, res));
app.get('/cars/:id', (req, res) => carsController.show(req, res));
app.put('/cars/:id', (req, res) => carsController.updateCar(req, res));
app.delete('/cars/:id', (req, res) => carsController.deleteCar(req, res));
app.put('/cars/:id/accessory', (req, res) => carsController.updateCarAccessory(req, res));

beforeAll(async () => {
  const url = 'mongodb+srv://bmfmlucas:Q1IPVdaQJAj39pdc@flexilease-api.fszu1nf.mongodb.net/?retryWrites=true&w=majority&appName=flexilease-api';
  await mongoose.connect(url);
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
  await mongoose.connection.close();
});

describe('Cars Controller Integration Tests', () => {
  let carId: string;

  test('Create Car - POST /cars', async () => {
    const carData = {
      model: 'Toyota Corolla',
      color: 'Red',
      year: 2020,
      value_per_day: 150,
      accessories: [{ description: 'Leather Seats' }, { description: 'Sunroof' }],
      number_of_passengers: 5,
    };

    const response = await request(app).post('/cars').send(carData);
    carId = response.body._id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.model).toBe('Toyota Corolla');
  });

  test('List Cars - GET /cars', async () => {
    const response = await request(app).get('/cars').query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  test('Get Car by ID - GET /cars/:id', async () => {
    const response = await request(app).get(`/cars/${carId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', carId);
  });

  test('Update Car - PUT /cars/:id', async () => {
    const updatedData = {
      model: 'Updated Toyota Corolla',
    };

    const response = await request(app).put(`/cars/${carId}`).send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('model', 'Updated Toyota Corolla');
  });

  test('Delete Car - DELETE /cars/:id', async () => {
    const response = await request(app).delete(`/cars/${carId}`);

    expect(response.status).toBe(200);
  });

  test('Update Car Accessory - PUT /cars/:id/accessory', async () => {
    const accessoryData = {
      _id: carId, 
      description: 'Leather Seats (Updated)',
    };

  
  jest.spyOn(Car, 'findById').mockResolvedValueOnce({
    _id: carId,
    accessories: [{ _id: 'valid-accessory-id', description: 'Leather Seats' }],
    save: jest.fn(),
  } as any);

  const response = await request(app).put(`/cars/${carId}/accessory`).send(accessoryData);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('message', 'Accessory updated or removed successfully');
  });
});
