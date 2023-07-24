import { IsEmail, IsUUID } from 'class-validator';

export class SubscriptionBody {
  @IsEmail()
  email: string;

  @IsUUID()
  postId: string;
}
