import { Subscription } from '@app/entities/subscription';
import { SubscriptionRepository } from '@app/repositories/subscriptions-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AllInscribed {
  constructor(private subscriptionsRepository: SubscriptionRepository) {}

  async execute(): Promise<Subscription[]> {
    return this.subscriptionsRepository.findAll();
  }
}
