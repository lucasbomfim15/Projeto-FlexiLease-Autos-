import mongoose from 'mongoose';
import ListUserService from '../../../modules/users/services/ListUserService';
import { IUser, User } from '../../../modules/users/models/User';
import UserRepository from '../../../modules/users/repositories/UsersRepository';

describe('ListUserService', () => {
    beforeAll(async () => {
      await mongoose.connect('mongodb+srv://bmfmlucas:Q1IPVdaQJAj39pdc@flexilease-api.fszu1nf.mongodb.net/?retryWrites=true&w=majority&appName=flexilease-api');
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });
  
    afterEach(async () => {
      await User.deleteMany({});
    });
    it('should list users without pagination', async () => {
        const usersData: IUser[] = [
          {
            _id: '668949e2596d6ddb3501af1e',
            name: 'User 1',
            cpf: '12345678901',
            birth: new Date('1990-01-01'),
            email: 'user1@example.com',
            password: 'password1',
            cep: '12345678',
            qualified: 'sim',
            patio: '',
            complement: '',
            neighborhood: '',
            locality: '',
            uf: 'SP',
          },
          {
            _id: '668949cad9c5051c39b91fd2',
            name: 'User 2',
            cpf: '98765432109',
            birth: new Date('1985-05-15'),
            email: 'user2@example.com',
            password: 'password2',
            cep: '87654321',
            qualified: 'não',
                    patio: '',
            complement: '',
            neighborhood: '',
            locality: '',
            uf: 'SP',
          },
        ];
    
        await User.create(usersData);
    
        const listUserService = new ListUserService(User);
    
        const result = await listUserService.listUsers({ page: 1, limit: 10 });
    
        expect(result).toBeDefined();
        expect(result.users).toHaveLength(usersData.length);
    
        const sortedUsersData = usersData.sort((a, b) => a.name.localeCompare(b.name));
        const sortedResultUsers = result.users.sort((a, b) => a.name.localeCompare(b.name));
    
        for (let i = 0; i < usersData.length; i++) {
          expect(sortedResultUsers[i].name).toBe(sortedUsersData[i].name);
          expect(sortedResultUsers[i].email).toBe(sortedUsersData[i].email);
        }
      });
    });
