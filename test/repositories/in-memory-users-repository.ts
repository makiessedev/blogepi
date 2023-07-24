import { User } from '../../src/app/entities/user';
import { UsersRepository } from 'src/app/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(props: User): Promise<void> {
    const user = new User(props);

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
