import { User } from './../../entities/User';
import { IUsersRepository } from './../../repositories/IUserRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IMailProvider } from '../../providers/IMailProvider';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('user already exists');
    }

    const user = new User(data);

    await this.usersRepository.save(user);
    await this.mailProvider.sendMail({
      to: {
        email: data.email,
        name: data.name,
      },
      from: {
        email: process.env.MAIL_FROM_EMAIL,
        name: process.env.MAIL_FROM_NAME,
      },
      subject: 'Welcome to Solid App!',
      body: `<p>${data.name}, welcome new member!</p>`
    })
  }
}
