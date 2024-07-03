import { User, IUser } from '@modules/users/models/User'
import { Document, Types } from 'mongoose';

class UserRepository {
  async createUser(userData: Omit<IUser, '_id'>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteUser(id: string): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }
    return await User.findByIdAndDelete(id);
  }

  async findUserById(id: string): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }
    return await User.findById(id);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findUserByEmailOrCpf(email: string, cpf: string): Promise<IUser | null> {
    return await User.findOne({ $or: [{ email }, { cpf }] });
  }

  async listUsers(): Promise<IUser[]> {
    return await User.find();
  }
}

export default new UserRepository();
