import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
  findById(id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUser(user_id?: string): Promise<Rental | undefined>;
}

export { IRentalsRepository };
