import { IsString } from 'class-validator';

export class SignInBody {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
