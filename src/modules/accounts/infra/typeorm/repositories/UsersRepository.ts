import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "../../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findByID(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user as User;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id,
    });

    this.repository.save(user);
  }
}
export { UsersRepository };
