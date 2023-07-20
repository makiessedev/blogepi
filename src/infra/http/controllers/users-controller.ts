import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/app/entities/user';
import { CreateUser } from 'src/app/use-cases/create-user';
import { CreateUserBody } from '../dtos/create-user-body';

@Controller('user')
export class UsersController {
  constructor(private createUser: CreateUser) {}

  @Post('')
  async create(@Body() body: CreateUserBody): Promise<User> {
    const { name, email, password } = body;

    const { user } = await this.createUser.execute({ name, email, password });

    return user;
  }
}
