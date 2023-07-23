import { Injectable } from '@nestjs/common';
import { Subscription } from '../entities/subscription';
import { SubscriptionRepository } from '../repositories/subscriptions-repository';

interface SubscriptionPostRequest {
  email: string;
  postId: string;
}

interface SubscriptionPostResponse {
  subscription: Subscription;
}

@Injectable()
export class SubscriptionPost {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async execute(
    request: SubscriptionPostRequest,
  ): Promise<SubscriptionPostResponse> {
    const { email, postId } = request;

    const subscription = new Subscription({ email, postId });

    await this.subscriptionRepository.subscribe(subscription);

    return { subscription };
  }
}
