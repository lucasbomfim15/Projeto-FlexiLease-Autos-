import mongoose from 'mongoose';
import AuthServices from '../../../modules/users/services/AuthServices';
import { IUser, User } from '../../../modules/users/models/User';
import AppError from '../../../shared/errors/AppError';

describe('AuthServices', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://bmfmlucas:Q1IPVdaQJAj39pdc@flexilease-api.fszu1nf.mongodb.net/?retryWrites=true&w=majority&appName=flexilease-api');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should authenticate a user with correct credentials', async () => {
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

    await User.create(userData);

    const authService = new AuthServices();
    const response = await authService.execute({ email: 'john.doe@example.com', password: 'password123' });

    expect(response).toHaveProperty('token');
    expect(response.user).toBeDefined();
    expect(response.user.email).toBe('john.doe@example.com');
  });

  it('should throw an AppError if email is incorrect', async () => {
    const authService = new AuthServices();

    try {
      await authService.execute({ email: 'wrong.email@example.com', password: 'password123' });
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('Combinação de email/senha incorreta.');
        expect(error.statusCode).toBe(401);
      } else {
        throw error;
      }
    }
  });

  it('should throw an AppError if password is incorrect', async () => {
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

    await User.create(userData);

    const authService = new AuthServices();

    try {
      await authService.execute({ email: 'john.doe@example.com', password: 'wrongpassword' });
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe('Combinação de email/senha incorreta.');
        expect(error.statusCode).toBe(401);
      } else {
        throw error;
      }
    }
  });
});
