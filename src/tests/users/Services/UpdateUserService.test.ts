import mongoose from 'mongoose';
import UpdateUserService from '../../../modules/users/services/UpdateUserService';
import { IUser, User } from '../../../modules/users/models/User';
import AppError from '../../../shared/errors/AppError';

describe('UpdateUserService', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://bmfmlucas:Q1IPVdaQJAj39pdc@flexilease-api.fszu1nf.mongodb.net/?retryWrites=true&w=majority&appName=flexilease-api');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should update a user by ID', async () => {
   
    const userData: IUser = {
      _id: '668954d59a52ad7f3f3425d9',
      name: 'John Doe',
      cpf: '12345678900',
      birth: new Date('1990-01-01'),
      email: 'john.doe@example.com',
      password: 'password123',
      cep: '12345678',
      qualified: 'yes',
      patio: '',
      complement: '',
      neighborhood: '',
      locality: '',
      uf: 'SP',
    };

    const createdUser = await User.create(userData);

    // Update user data
    const updateService = new UpdateUserService(User);
    const updatedUserData = {
      name: 'Updated Name',
      cpf: '12345678900', 
      birth: new Date('1990-01-01'),
      email: 'updated.email@example.com',
      password: 'updatedpassword',
      cep: '87654321',
      qualified: 'no',
    };

    const updatedUser = await updateService.updateUserById(createdUser._id, updatedUserData);

    // Assert
    expect(updatedUser).toBeDefined();
    expect(updatedUser?._id).toEqual(createdUser._id);
    expect(updatedUser?.name).toBe('Updated Name');
    expect(updatedUser?.email).toBe('updated.email@example.com');
  });

  it('should throw an AppError if ID is not provided', async () => {
    const updateService = new UpdateUserService(User);
    const updatedUserData = {
      name: 'Updated Name',
      cpf: '12345678900', 
      birth: new Date('1990-01-01'),
      email: 'updated.email@example.com',
      password: 'updatedpassword',
      cep: '87654321',
      qualified: 'no',
    };

    try {
      await updateService.updateUserById(undefined as any, updatedUserData);
    } catch (error) {
      if (error instanceof AppError) { 
        expect(error.message).toBe('ID do usuário não fornecido');
      } else {
        throw error; 
      }
    }
  });
});
