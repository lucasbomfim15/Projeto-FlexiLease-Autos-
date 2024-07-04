import { Car, ICar, IAccessory } from '@modules/cars/models/Car';
import { Document, Types } from 'mongoose';

class CarsRepository {
  async createCar(userData: Omit<ICar, '_id'>): Promise<ICar> {
    const car = new Car(userData);
    return await car.save();
  }

  async listCars(): Promise<ICar[]> {
    return await Car.find();
  }

  async findCarById(id: string): Promise<ICar | null> {
    return await Car.findById(id);
  }

  async deleteCar(id: string): Promise<ICar | null> {
    return await Car.findByIdAndDelete(id);
  }

  async updateCar(id: string, userData: Partial<ICar>): Promise<ICar | null> {
    return await Car.findByIdAndUpdate(id, userData, { new: true });
  }

  async updateCarAccessory(
    id: string,
    accessory: IAccessory,
  ): Promise<ICar | null> {
    const car = await Car.findById(id);
    if (!car) {
      return null;
    }

    const accessoryIndex = car.accessories.findIndex(
      acc => acc._id === accessory._id,
    );
    if (accessoryIndex !== -1) {
      car.accessories[accessoryIndex] = accessory;
    } else {
      car.accessories.push(accessory);
    }

    await car.save();
    return car;
  }
}

export default new CarsRepository();
