import ReserveRepository from "../repositories/ReserveRepository";
import { IReserve } from '../models/Reserve';
import { User } from "@modules/users/models/User";
import { Car } from "@modules/cars/models/Car";


class UpdateReserveService{
  
    async updateReserve(id: string, reserveData: Partial<IReserve>): Promise<IReserve | null> {
        return await ReserveRepository.update(id, reserveData);
    }
}

export default UpdateReserveService