import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubscriptionBody } from '../dtos/subscription-body';
import { Subscribe } from '@app/use-cases/subscribe';
import { AllInscribed } from '@app/use-cases/all-inscribed';

@Controller('subscribe')
export class SubscriptionsController {
  constructor(
    private subscription: Subscribe,
    private allInscribed: AllInscribed,
  ) {}

  @Post()
  async subscribe(@Body() body: SubscriptionBody) {
    const email = body.email;
    const { subscription } = await this.subscription.execute({ email });

    return subscription;
  }

  @Get('all')
  async viewAll() {
    return this.allInscribed.execute();
  }
}
