import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUser } from 'src/app/use-cases/authenticate-user';
import { SignInBody } from '../dtos/sign-in-body';

@Controller('auth')
export class AuthenticateController {
  constructor(private authenticate: AuthenticateUser) {}

  @Post('sign')
  async signIn(@Body() body: SignInBody) {
    const { email, password } = body;

    const { token } = await this.authenticate.sign({ email, password });

    return { token };
  }
}
