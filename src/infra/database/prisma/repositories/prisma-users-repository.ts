import { User } from '../../../../app/entities/user';
import { UsersRepository } from '../../../../app/repositories/users-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({ data: raw });
  }
}
