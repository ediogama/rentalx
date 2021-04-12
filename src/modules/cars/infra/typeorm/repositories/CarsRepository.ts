import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    category_id,
    brand,
    fine_amount,
    daily_rate,
    description,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      category_id,
      brand,
      fine_amount,
      daily_rate,
      description,
      license_plate,
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }
}

export { CarsRepository };
