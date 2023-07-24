import { User } from './user';

describe('Create User', () => {
  it('Should be able to user', () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123',
    });

    expect(user.isAdmin).toBeFalsy();
    expect(user.id).toBeTruthy();
    expect(user.createdAt).toBeInstanceOf(Date);
  });
});
