import { Body, Controller, Post } from '@nestjs/common';
import { SubscriptionBody } from '../dtos/subscription-body';
import { Subscribe } from '@app/use-cases/subscribe';

@Controller('subscribe')
export class SubscriptionsController {
  constructor(private subscription: Subscribe) {}

  @Post()
  async subscribe(@Body() body: SubscriptionBody) {
    const email = body.email;
    const { subscription } = await this.subscription.execute({ email });

    return subscription;
  }
}
