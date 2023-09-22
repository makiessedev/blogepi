import { Subscription } from 'src/app/entities/subscription';

export class PrismaSubscriptionMapper {
  static toDomain(data): Subscription {
    return new Subscription(data);
  }

  static toPrisma(data: Subscription) {
    return {
      email: data.email,
      id: data.id,
      subscribedAt: data.subscribedAt,
    };
  }
}
