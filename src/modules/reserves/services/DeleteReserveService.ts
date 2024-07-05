import ReserveRepository from "../repositories/ReserveRepository";
import { IReserve } from '../models/Reserve';
import { User } from "@modules/users/models/User";
import { Car } from "@modules/cars/models/Car";



class DeleteReserveService {
    async deleteReserve(id: string): Promise<IReserve | null> {
        return await ReserveRepository.delete(id);
    }
}

export default DeleteReserveService