import { Injectable } from '@nestjs/common';
import { Subscription as SubscriptionEntity } from '../entities/subscription';
import { SubscriptionRepository } from '../repositories/subscriptions-repository';

interface SubscriptionRequest {
  email: string;
}

interface SubscriptionResponse {
  subscription: SubscriptionEntity;
}

@Injectable()
export class Subscribe {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async execute(request: SubscriptionRequest): Promise<SubscriptionResponse> {
    const { email } = request;

    const subscription = new SubscriptionEntity({ email });

    await this.subscriptionRepository.subscribe(subscription);

    return { subscription };
  }
}
