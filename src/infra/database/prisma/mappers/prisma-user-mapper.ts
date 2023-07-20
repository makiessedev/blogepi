import { User as rawUser } from '@prisma/client';
import { User } from 'src/app/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      isAdmin: user.isAdmin,
    };
  }

  static toDomain(user: rawUser): User {
    return new User(user);
  }
}
