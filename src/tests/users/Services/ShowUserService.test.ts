import mongoose from 'mongoose';
import ShowUserService from '../../../modules/users/services/ShowUserService';
import { IUser, User } from '../../../modules/users/models/User';
import AppError from '../../../shared/errors/AppError';

describe('ShowUserService', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://bmfmlucas:Q1IPVdaQJAj39pdc@flexilease-api.fszu1nf.mongodb.net/?retryWrites=true&w=majority&appName=flexilease-api');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should return a user by ID', async () => {
    // Create a user to find
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

    // Find user by ID
    const showService = new ShowUserService(User);
    const foundUser = await showService.findUserById(createdUser._id);

    // Assert
    expect(foundUser).toBeDefined();
    expect(foundUser?._id).toEqual(createdUser._id);
    expect(foundUser?.name).toBe('John Doe');
    expect(foundUser?.email).toBe('john.doe@example.com');
  });

  it('should throw an AppError if ID is not provided', async () => {
    const showService = new ShowUserService(User);

    try {
      await showService.findUserById(undefined as any);
    } catch (error) {
      if (error instanceof AppError) { // Assegurando o tipo do erro
        expect(error.message).toBe('ID do usuário não fornecido');
      } else {
        throw error; // Re-lançar erro se não for do tipo esperado
      }
    }
  });

  it('should throw an AppError if user is not found', async () => {
    const showService = new ShowUserService(User);

    try {
      await showService.findUserById('60c72b2f9b1e8b001c8e4c5a'); // ID inválido ou não existente
    } catch (error) {
      if (error instanceof AppError) { // Assegurando o tipo do erro
        expect(error.message).toBe('Usuário não encontrado');
      } else {
        throw error; // Re-lançar erro se não for do tipo esperado
      }
    }
  });
});
