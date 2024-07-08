
import {Car, IAccessory} from '../../../modules/cars/models/Car';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  car_id: string;
  accessory_id: string;
  description: string;
}

class UpdateCarAccessoryService {
  public async execute({ car_id, accessory_id, description }: IRequest): Promise<void> {
    const car = await Car.findById(car_id);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    const accessoryIndex = car.accessories.findIndex(
      (accessory: IAccessory) => accessory._id.toString() === accessory_id
    );

    if (accessoryIndex === -1) {
      throw new AppError('Accessory not found', 404);
    }

    // Check if the description already exists in the car's accessories
    const existingAccessoryIndex = car.accessories.findIndex(
      (accessory: IAccessory) => accessory.description === description
    );

    if (existingAccessoryIndex !== -1) {
      // Remove the accessory if the description already exists
      car.accessories.splice(existingAccessoryIndex, 1);
    } else {
      // Update the accessory's description
      car.accessories[accessoryIndex].description = description;
    }

    await car.save();
  }
}

export default UpdateCarAccessoryService;
