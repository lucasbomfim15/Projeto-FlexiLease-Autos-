// src/tests/services/CreateUserService.test.ts
import mongoose from 'mongoose';
import CreateUserService from '../../../modules/users/services/CreateUserService';
import UserRepository from '../../../modules/users/repositories/UsersRepository';
import { IUser } from '../../../modules/users/models/User';

type UserData = {
  _id: string;
  name: string;
  cpf: string;
  birth: Date;
  email: string;
  password: string;
  cep: string;
  qualified: string;
  patio: string;
  complement: string;
  neighborhood: string;
  locality: string;
  uf: string;
};


describe('CreateUserService', () => {
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

  it('should create a user', async () => {
    const userData: UserData = {
      _id: '66893f2dd00f8956329d5e6d',
      name: 'John Doe',
      cpf: '099.307.380-88',
      birth: new Date('2000-01-01'),
      email: 'johntest13@example.com',
      password: 'password123',
      cep: '12345678',
      qualified: 'sim',
      patio: '',
      complement: '',
      neighborhood: '',
      locality: '',
      uf: 'SP',
    };

    const createService = new CreateUserService();
    const user = await createService.execute(userData);
    expect(user).toHaveProperty('_id');
    expect(user.name).toBe('John Doe');
  });
});