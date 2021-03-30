import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
}

export { IUsersRepository };
