import mongoose from 'mongoose';
import UserRepository from '../../../modules/users/repositories/UsersRepository';  // Caminho relativo ajustado
import { IUser, User } from '../../../modules/users/models/User';

type UserData = {
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

describe('UserRepository', () => {
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

  it('should create a user', async () => {
    const userData: UserData = {
      name: 'John Doe',
      cpf: '12345678901',
      birth: new Date('2000-01-01'),
      email: 'john@example.com',
      password: 'password123',
      cep: '12345678',
      qualified: 'sim',
      patio: '',
      complement: '',
      neighborhood: '',
      locality: '',
      uf: 'SP',
    };

    const user = await UserRepository.createUser(userData);
    expect(user).toHaveProperty('_id');
    expect(user.name).toBe('John Doe');
  });

  it('should update a user', async () => {
    const user = new User({
      name: 'John Doe',
      cpf: '12345678901',
      birth: new Date('2000-01-01'),
      email: 'john@example.com',
      password: 'password123',
      cep: '12345678',
      qualified: 'sim',
      patio: '',
      complement: '',
      neighborhood: '',
      locality: '',
      uf: 'SP',
    });
    await user.save();

    const updatedUser = await UserRepository.updateUser(user._id, { name: 'Jane Doe' });
    expect(updatedUser).toBeTruthy();
    expect(updatedUser?.name).toBe('Jane Doe');
  });

  it('should delete a user', async () => {
    const user = new User({
      name: 'John Doe',
      cpf: '12345678901',
      birth: new Date('2000-01-01'),
      email: 'john@example.com',
      password: 'password123',
      cep: '12345678',
      qualified: 'sim',
      patio: '',
      complement: '',
      neighborhood: '',
      locality: '',
      uf: 'SP',
    });
    await user.save();

    const deletedUser = await UserRepository.deleteUser(user._id);
    expect(deletedUser).toBeTruthy();
    expect(await UserRepository.findUserById(user._id)).toBeNull();
  });

  it('should find a user by id', async () => {
    const user = new User({
      _id: '66894782f6e97cda212baaaf',
      name: 'John Doe',
      cpf: '12345678901',
      birth: new Date('2000-01-01'),
      email: 'john@example.com',
      password: 'password123',
      cep: '12345678',
      qualified: 'sim',
     patio: '',
      complement: '',
      neighborhood: '',
      locality: '',
      uf: 'SP', 
    });
    await user.save();

    const foundUser = await UserRepository.findUserById(user._id);
    expect(foundUser).toBeTruthy();
    expect(foundUser?.name).toBe('John Doe');
  });

  it('should find a user by email', async () => {
    const user = new User({
      name: 'John Doe',
      cpf: '12345678901',
      birth: new Date('2000-01-01'),
      email: 'john@example.com',
      password: 'password123',
      cep: '12345678',
      qualified: 'sim',
      patio: '',
      complement: '',
      neighborhood: '',
      locality: '',
      uf: 'SP',
    });
    await user.save();

    const foundUser = await UserRepository.findUserByEmail('john@example.com');
    expect(foundUser).toBeTruthy();
    expect(foundUser?.email).toBe('john@example.com');
  });

  it('should list all users', async () => {
    const user1 = new User({
      name: 'John Doit',
      cpf: '12345678901',
      birth: new Date('2000-01-01'),
      email: 'johndoit@example.com',
      password: 'password123',
      cep: '12345678',
      qualified: 'sim',
      patio: '',
      complement: '',
      neighborhood: '',
      locality: '',
      uf: 'SP',
    });
    const user2 = new User({
      name: 'Jane Doe',
      cpf: '12345678902',
      birth: new Date('2000-01-01'),
      email: 'jane@example.com',
      password: 'password123',
      cep: '12345678',
      qualified: 'sim',
      patio: '',
      complement: '',
      neighborhood: '',
      locality: '',
      uf: 'SP',
    });
    await user1.save();
    await user2.save();

    const users = await UserRepository.listUsers();
    expect(users.length).toBe(2);
  });
});
