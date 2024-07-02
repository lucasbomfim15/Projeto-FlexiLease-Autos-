import mongoose from 'mongoose';

const { Schema } = mongoose;

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

const User = mongoose.model("User", userSchema);

module.exports = {User, userSchema}