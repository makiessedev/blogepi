import { randomUUID } from 'crypto';

interface SubscribedProps {
  id?: string;
  email: string;
  postId: string;
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

  get postId(): string {
    return this.props.postId;
  }

  set postId(postId: string) {
    this.props.postId = postId;
  }

  get subscribedAt(): Date {
    return this.props.subscribedAt;
  }
}
