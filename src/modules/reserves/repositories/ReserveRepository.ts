import {Reserve,  IReserve} from '../models/Reserve';

class ReserveRepository {
    async create(reserveData: Partial<IReserve>): Promise<IReserve> {
        const reserve = new Reserve(reserveData);
        return await reserve.save();
    }

    async findAll(): Promise<IReserve[]> {
        return await Reserve.find().populate('id_user').populate('id_car').exec();
    }

    async findById(id: string): Promise<IReserve | null> {
        return await Reserve.findById(id).populate('id_user').populate('id_car').exec();
    }

    async findByCarAndDate(carId: string, startDate: Date, endDate: Date): Promise<IReserve | null> {
        return await Reserve.findOne({
            id_car: carId,
            $or: [
                { start_date: { $lte: endDate, $gte: startDate } },
                { end_date: { $lte: endDate, $gte: startDate } },
                { start_date: { $lte: startDate }, end_date: { $gte: endDate } },
            ]
        }).exec();
    }

    async findByUserAndDate(userId: string, startDate: Date, endDate: Date): Promise<IReserve | null> {
        return await Reserve.findOne({
            id_user: userId,
            $or: [
                { start_date: { $lte: endDate, $gte: startDate } },
                { end_date: { $lte: endDate, $gte: startDate } },
                { start_date: { $lte: startDate }, end_date: { $gte: endDate } },
            ]
        }).exec();
    }

    async update(id: string, reserveData: Partial<IReserve>): Promise<IReserve | null> {
        return await Reserve.findByIdAndUpdate(id, reserveData, { new: true }).exec();
    }

    async delete(id: string): Promise<IReserve | null> {
        return await Reserve.findByIdAndDelete(id).exec();
    }
}

export default new ReserveRepository();
