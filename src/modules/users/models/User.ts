import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
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
  }

const userSchema = new Schema({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    birth: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cep: { type: String, required: true },
    qualified: { type: String, default: '' }, 
    patio: { type: String, default: '' }, 
    complement: { type: String, default: '' }, 
    neighborhood: { type: String, default: '' }, 
    locality: { type: String, default: '' }, 
    uf: { type: String, default: '' }, 
});

const User = model<IUser>('User', userSchema);

export { IUser, User }