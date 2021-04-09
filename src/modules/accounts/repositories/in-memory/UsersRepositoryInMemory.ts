import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    password,
    driver_license,
    email,
  }: ICreateUsersDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
  async findByID(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
