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
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      views: post.views,
      isPublish: post.isPublish,
      updatedAt: post.updatedAt,
      createdAt: post.createdAt,
    };
  }
}
