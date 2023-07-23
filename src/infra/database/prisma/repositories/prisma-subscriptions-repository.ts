import { Subscription } from 'src/app/entities/subscription';
import { SubscriptionRepository } from 'src/app/repositories/subscriptions-repository';
import { PrismaService } from '../prisma.service';
import { PrismaSubscriptionMapper } from '../mappers/prisma-subscription-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaSubscriptionsRepository implements SubscriptionRepository {
  constructor(private prisma: PrismaService) {}

  async subscribe(props: Subscription): Promise<void> {
    const subscription = PrismaSubscriptionMapper.toPrisma(props);
    await this.prisma.subscription.create({ data: subscription });
  }
}
