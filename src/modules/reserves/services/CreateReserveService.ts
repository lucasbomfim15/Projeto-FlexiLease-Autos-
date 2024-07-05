import ReserveRepository from '../repositories/ReserveRepository';
import { IReserve } from '../models/Reserve';
import { User } from '@modules/users/models/User';
import { Car } from '@modules/cars/models/Car';

class CreateReserveService{
    async createReserve(reserveData: Partial<IReserve>): Promise<IReserve | string> {
        const { id_user, id_car, start_date, end_date } = reserveData;

       
        if (!id_user || !id_car || !start_date || !end_date) {
            throw new Error('Todos os campos são obrigatórios.');
        }

      
        const user = await User.findById(id_user).exec();
        if (!user || !user.qualified) {
            throw new Error('O usuário deve possuir uma carteira de motorista.');
        }

        const existingCarReserve = await ReserveRepository.findByCarAndDate(id_car, new Date(start_date), new Date(end_date));
        if (existingCarReserve) {
            throw new Error('Não é permitida mais de uma reserva do mesmo carro no mesmo dia.');
        }

        const existingUserReserve = await ReserveRepository.findByUserAndDate(id_user, new Date(start_date), new Date(end_date));
        if (existingUserReserve) {
            throw new Error('Não é permitida mais de uma reserva no mesmo período pelo mesmo usuário.');
        }

        const car = await Car.findById(id_car).exec();
        if (!car) {
            throw new Error('Carro não encontrado.');
        }
        const days = (new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000 * 3600 * 24) + 1;
        reserveData.final_value = (car.value_per_day * days).toFixed(2);

        return await ReserveRepository.create(reserveData);
    }
}

export default CreateReserveService;