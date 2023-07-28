import { Subscription } from '../entities/subscription';

export abstract class SubscriptionRepository {
  abstract subscribe(props: Subscription): Promise<void>;
  abstract findAll(): Promise<Subscription[]>;
}
