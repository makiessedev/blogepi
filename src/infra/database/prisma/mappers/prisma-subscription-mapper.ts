import { Subscription as rawSubscription } from '@prisma/client';
import { Subscription } from 'src/app/entities/subscription';

export class PrismaSubscriptionMapper {
  static toDomain(data: rawSubscription): Subscription {
    return new Subscription(data);
  }

  static toPrisma(data: Subscription): rawSubscription {
    return {
      email: data.email,
      id: data.id,
      postId: data.postId,
      subscribedAt: data.subscribedAt,
    };
  }
}
