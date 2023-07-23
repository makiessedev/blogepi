import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UsersRepository } from '../repositories/users-repository';
import { JwtService } from '@nestjs/jwt';

interface AuthenticatedUserRequest {
  email: string;
  password: string;
}

interface AuthenticatedUserResponse {
  token: string;
}

@Injectable()
export class AuthenticateUser {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async sign(
    request: AuthenticatedUserRequest,
  ): Promise<AuthenticatedUserResponse> {
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException('email or password invalid!');

    const matchPassword = await compare(password, user.password);

    if (!matchPassword)
      throw new UnauthorizedException('email or password invalid!');

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      token,
    };
  }
}
