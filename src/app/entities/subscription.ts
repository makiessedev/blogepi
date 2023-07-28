import { randomUUID } from 'crypto';

interface SubscribedProps {
  id?: string;
  email: string;
  subscribedAt?: Date;
}

export class Subscription {
  constructor(private props: SubscribedProps) {
    if (!this.props.id) {
      this.props.id = randomUUID();
      this.props.subscribedAt = new Date();
    }
  }

  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get subscribedAt(): Date {
    return this.props.subscribedAt;
  }
}
