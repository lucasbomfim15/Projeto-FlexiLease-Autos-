// src/tests/users/Services/DeleteUserService.test.ts
import mongoose from 'mongoose';
import DeleteUserService from '../../../modules/users/services/DeleteUserService';
import { IUser, User } from '../../../modules/users/models/User';
import AppError from '../../../shared/errors/AppError';

describe('DeleteUserService', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://bmfmlucas:Q1IPVdaQJAj39pdc@flexilease-api.fszu1nf.mongodb.net/?retryWrites=true&w=majority&appName=flexilease-api');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should delete a user by ID', async () => {
    const userData: IUser = {
      _id: '66894b2cc152a4e07d99fa08',
      name: 'John Doe',
      cpf: '12345678901',
      birth: new Date('1990-01-01'),
      email: 'johndoe@example.com',
      password: 'password123',
      cep: '12345678',
      qualified: 'sim',
      patio: '',
      complement: '',
      neighborhood: '',
      locality: '',
      uf: 'SP',
    };

    const createdUser = await User.create(userData);
    const deleteUserService = new DeleteUserService(User);
    const deletedUser = await deleteUserService.deleteUserById(userData._id.toString());

    expect(deletedUser).toBeDefined();
    expect(deletedUser?._id.toString()).toBe(userData._id.toString());

    const foundUser = await User.findById(userData._id);
    expect(foundUser).toBeNull();
  });


});
