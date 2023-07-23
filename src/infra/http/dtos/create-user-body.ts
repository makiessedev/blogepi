import { IsString } from 'class-validator';

export class CreateUserBody {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
