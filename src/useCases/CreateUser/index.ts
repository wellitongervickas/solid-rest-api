import { CreateUserController } from './CreateUserController';
import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailTrapMailProvider();
const postgresUserRepository = new PostgresUsersRepository();

const createUserCase = new CreateUserUseCase(
  postgresUserRepository,
  mailtrapMailProvider,
);

const createUserController = new CreateUserController(createUserCase);

export {
  createUserController,
  createUserCase,
}
