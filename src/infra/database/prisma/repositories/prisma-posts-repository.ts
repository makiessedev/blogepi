import { PostsRepository } from '../../../../app/repositories/posts-repository';
import { PrismaService } from '../prisma.service';
import { Post } from '../../../../app/entities/post';
import { PrismaPostMapper } from '../mappers/prisma-post-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (!post) return null;

    return PrismaPostMapper.toDomain(post);
  }

  async create(post: Post): Promise<void> {
    const raw = PrismaPostMapper.toPrisma(post);
    await this.prisma.post.create({ data: raw });
  }
}
