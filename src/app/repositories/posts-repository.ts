import { Post } from '../entities/post';

export interface UpdatePostDTO {
  id: string;
  isPublish?: boolean;
  title?: string;
  content?: string;
  imageUrl?: string;
}

export abstract class PostsRepository {
  abstract create(post: Post): Promise<void>;
  abstract delete(postId: string): Promise<void>;
  abstract update(post: UpdatePostDTO): Promise<void>;
  abstract findById(id: string): Promise<Post | null>;
  abstract findAll(): Promise<Post[]>;
}
