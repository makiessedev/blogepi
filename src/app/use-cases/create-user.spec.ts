import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { UsersRepository } from '../repositories/users-repository';
import { CreateUser } from './create-user';
import { compare } from 'bcrypt';

let usersRepository: UsersRepository;
let createUser: CreateUser;

describe('Create User', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(usersRepository);
  });

  it('Should be able to create user', async () => {
    const userProps = {
      name: 'john Down',
      email: 'john@email.com',
      password: '123',
    };

    await createUser.execute(userProps);

    const user = await usersRepository.findByEmail(userProps.email);

    expect(user.password !== userProps.password).toBeTruthy();
    expect(() => compare(userProps.password, user.password)).toBeTruthy();
    expect(user.isAdmin).toBeFalsy();
  });
});
