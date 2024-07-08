import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IAccessory { 
  _id: string;
  description: string;
}

interface ICar  {
  _id: string;
  model: string;
  color: string;
  year: number;
  value_per_day: number;
  accessories: IAccessory[];
  number_of_passengers: number;
}

const AccessorySchema = new Schema<IAccessory>({
  _id: {
    type: String,
    default: uuidv4,
  },
  description: {
    type: String,
    required: true,
  },
});

const CarSchema = new Schema<ICar>({
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1950,
    max: 2023,
  },
  value_per_day: {
    type: Number,
    required: true,
  },
  accessories: {
    type: [AccessorySchema],
    required: true,
    validate: {
      validator: function (v: IAccessory[]) {
        return v.length > 0;
      },
      message: 'A car must have at least one accessory.',
    },
  },
  number_of_passengers: {
    type: Number,
    required: true,
  },
});

const Car = model<ICar>('Car', CarSchema);

export { Car, ICar, IAccessory };
