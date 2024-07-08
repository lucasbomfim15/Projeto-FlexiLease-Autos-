import ReserveRepository from "../repositories/ReserveRepository";
import { IReserve } from '../models/Reserve';
import { User } from "@modules/users/models/User";
import { Car } from "@modules/cars/models/Car";


class ShowReserveService {
    async getReserveById(id: string): Promise<IReserve | null> {
        return await ReserveRepository.findById(id);
    }
}

export default ShowReserveService;