import { Post as rawPost } from '@prisma/client';
import { Post } from '../../../../app/entities/post';

export class PrismaPostMapper {
  static toDomain(post: rawPost): Post {
    return new Post(post);
  }

  static toPrisma(post: Post): rawPost {
    return {
      id: post.id,
      userId: post.userId,
      title: post.title,
      description: post.description,
      content: post.content,
      imageUrl: post.imageUrl,
      views: post.views,
      author: post.author,
      authorUrl: post.authorUrl,
      isPublish: post.isPublish,
      updatedAt: post.updatedAt,
      createdAt: post.createdAt,
    };
  }
}
