import UsersRepository from "../repositories/UsersRepository";
import { IUser } from "../models/User";
import * as mongoose from 'mongoose';
import isValidCPF from "../Utils/IsValidCpf";
import AppError from "../../../shared/errors/AppError";
import axios from "axios";

class CreateUserService{
    
    async execute(userData: Omit<IUser, 'id'>): Promise<IUser> {
        const { name, cpf, birth, email, password, cep, qualified } = userData;
        
        // Verificando se todos os campos obrigatórios estão presentes
        if (!name || !cpf || !birth || !email || !password || !cep || !qualified) {
          throw new AppError('Todos os campos são obrigatórios.');
        }
    
        // Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new AppError('E-mail inválido.');
        }
    
        // Validação de senha
        if (password.length < 6) {
          throw new AppError('A senha deve ter pelo menos 6 caracteres.');
        }
    
        // Validação de qualified
        if (qualified !== 'sim' && qualified !== 'não') {
          throw new AppError('O campo "qualified" deve ser "sim" ou "não".');
        }
    
        // Validação de CPF
        if (!isValidCPF(cpf)) {
          throw new AppError('CPF inválido.');
        }
    
        // Verificar se o usuário tem pelo menos 18 anos
        const birthDate = new Date(birth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 18) {
          throw new AppError('O usuário deve ter pelo menos 18 anos.');
        }
    
        // Verificação de unicidade do CPF e e-mail
        const existingUser = await UsersRepository.findUserByEmailOrCpf(email, cpf);
        if (existingUser) {
          throw new Error('E-mail ou CPF já cadastrado.');
        }
    
   
      
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.status !== 200) {
          throw new AppError('Não foi possível obter o endereço pelo CEP fornecido.');
        }
    
        const { logradouro, complemento, bairro, localidade, uf: estado } = response.data;
    
      
        const userWithAddress: IUser = {
          ...userData,
          patio: logradouro,
          complement: complemento,
          neighborhood: bairro,
          locality: localidade,
          uf: estado
        };
    
        
        return await UsersRepository.createUser(userWithAddress);
      }
}

export default CreateUserService;