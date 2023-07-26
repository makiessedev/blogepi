import { Post as rawPost } from '@prisma/client';
import { Post } from '../../../../app/entities/post';

export class PrismaPostMapper {
  static toDomain(post: rawPost): Post {
    return new Post(post);
  }

  static toPrisma(post: Post): rawPost {
    return {
      id: post.id,
      authorId: post.authorId,
      content: post.content,
      imageUrl: post.imageUrl,
      createdAt: post.createdAt,
      isPublish: post.isPublish,
      title: post.title,
      updatedAt: post.updatedAt,
    };
  }
}
