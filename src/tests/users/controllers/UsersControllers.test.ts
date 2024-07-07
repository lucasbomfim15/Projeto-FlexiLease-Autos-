import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import UsersController from '../../../modules/users/controllers/UsersController';
import {User} from '../../../modules/users/models/User';

const app = express();
app.use(bodyParser.json());

const usersController = new UsersController();

app.post('/users', (req, res) => usersController.createUser(req, res));
app.get('/users', (req, res) => usersController.listUsers(req, res));
app.get('/users/:id', (req, res) => usersController.show(req, res));
app.put('/users/:id', (req, res) => usersController.update(req, res));
app.delete('/users/:id', (req, res) => usersController.delete(req, res));

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

describe('Users Controller Integration Tests', () => {
  
  let userId: string;

  test('Create User - POST /users', async () => {
    const userData = {
      name: 'Test User',
      cpf: '123.456.789-09',
      birth: '1990-01-01',
      email: 'testuser@example.com',
      password: 'password123',
      cep: '01001-000',
      qualified: 'sim'
    };

    const response = await request(app).post('/users').send(userData);
    userId = response.body._id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('Test User');
  });

  test('List Users - GET /users', async () => {
    const response = await request(app).get('/users').query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeGreaterThanOrEqual(1);
    expect(response.body.pagination.totalUsers).toBeGreaterThanOrEqual(1);
  });

  test('Get User by ID - GET /users/:id', async () => {
    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', userId);
  });

  test('Update User - PUT /users/:id', async () => {
    const updatedData = {
      name: 'Updated User'
    };

    const response = await request(app).put(`/users/${userId}`).send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated User');
  });

  test('Delete User - DELETE /users/:id', async () => {
    const response = await request(app).delete(`/users/${userId}`);

    expect(response.status).toBe(200);
   
  });
});
