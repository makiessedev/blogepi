import { randomUUID } from 'crypto';

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
}

export class User {
  constructor(private props: UserProps) {
    if (!this.props.id) this.props.id = randomUUID();
    if (!this.props.createdAt) this.props.createdAt = new Date();
    if (this.isAdmin === undefined) this.props.isAdmin = false;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get isAdmin(): boolean {
    return this.props.isAdmin;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
