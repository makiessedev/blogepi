import { Subscription } from 'src/app/entities/subscription';
import { SubscriptionRepository } from 'src/app/repositories/subscriptions-repository';

export class InMemorySubscriptionsRepository implements SubscriptionRepository {
  public subscriptions: Subscription[] = [];

  async subscribe(props: Subscription): Promise<void> {
    const subscription = new Subscription(props);

    this.subscriptions.push(subscription);
  }
}
