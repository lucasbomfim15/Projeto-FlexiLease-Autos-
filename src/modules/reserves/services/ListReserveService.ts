import ReserveRepository from "../repositories/ReserveRepository";
import { IReserve } from '../models/Reserve';
import { User } from "@modules/users/models/User";
import { Car } from "@modules/cars/models/Car";


class ListReserveService {
    async getAllReserves(): Promise<IReserve[]> {
        return await ReserveRepository.findAll();
    }
}

export default ListReserveService