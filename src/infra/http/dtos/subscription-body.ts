import { IsEmail } from 'class-validator';

export class SubscriptionBody {
  @IsEmail()
  email: string;
}
