import { CreateUserUseCase } from './CreateUserUseCase';

import{ Request, Response } from 'express';

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    try {
      return response.status(201).send();
    } catch (error) {
      return response.status(422).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
