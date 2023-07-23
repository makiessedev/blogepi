import { Post } from '../entities/post';
import { PostsRepository } from '../repositories/posts-repository';

interface CreatePostRequest {
  isPublish?: boolean;
  title: string;
  content: string;
  authorId: string;
}

interface CreatePostResponse {
  post: Post;
}

export class CreatePost {
  constructor(private postsRepository: PostsRepository) {}

  async execute(request: CreatePostRequest): Promise<CreatePostResponse> {
    const { isPublish, title, content, authorId } = request;

    const post = new Post({ isPublish, title, content, authorId });

    await this.postsRepository.create(post);

    return {
      post,
    };
  }
}
