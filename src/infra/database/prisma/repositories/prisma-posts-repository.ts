import { PostsRepository } from '../../../../app/repositories/posts-repository';
import { PrismaService } from '../prisma.service';
import { Post } from '../../../../app/entities/post';
import { PrismaPostMapper } from '../mappers/prisma-post-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    const raw = await this.prisma.post.findMany();

    return raw.map(PrismaPostMapper.toDomain);
  }

  async delete(postId: string): Promise<void> {
    await this.prisma.post.delete({ where: { id: postId } });
  }

  async update(post: Post): Promise<void> {
    await this.prisma.post.update({
      where: { id: post.id },
      data: {
        content: post.content,
        imageUrl: post.imageUrl,
        isPublish: post.isPublish,
        title: post.title,
      },
    });
  }

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
