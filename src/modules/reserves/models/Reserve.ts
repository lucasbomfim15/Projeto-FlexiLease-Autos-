import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '@modules/users/models/User'; 
import { ICar } from '@modules/cars/models/Car'

interface IReserve extends Document {
    _id: string;
    id_user: IUser['_id'];
    start_date: Date;
    end_date: Date;
    id_car: ICar['_id'];
    final_value: string;
}

const ReserveSchema = new Schema<IReserve>({
    _id: {
        type: String,
        default: uuidv4,
    },
    id_user: {
        type: String,
        ref: 'User',
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    id_car: {
        type: String,
        ref: 'Car',
        required: true,
    },
    final_value: {
        type: String,
        required: true,
    },
});

const Reserve = model<IReserve>('Reserve', ReserveSchema);

export {Reserve, IReserve}
