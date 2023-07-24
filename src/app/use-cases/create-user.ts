import { hash } from 'bcrypt';

import { UsersRepository } from '../repositories/users-repository';
import { User } from '../entities/user';
import { Injectable, UnauthorizedException } from '@nestjs/common';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, password } = request;

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists)
      throw new UnauthorizedException('User already exists');

    const hashPassword = await hash(password, 8);

    const user = new User({ name, email, password: hashPassword });

    await this.usersRepository.create(user);

    return { user };
  }
}
