import { InMemoryPostsRepository } from '@test/repositories/in-memory-posts-repository';
import { PostsRepository } from '../repositories/posts-repository';
import { CreatePost } from './create-post';

let postsRepository: PostsRepository;
let createPost: CreatePost;

describe('Create Post', () => {
  beforeAll(() => {
    postsRepository = new InMemoryPostsRepository();
    createPost = new CreatePost(postsRepository);
  });

  it('Should be able to create post', async () => {
    const { post } = await createPost.execute({
      authorId: 'example autor ip',
      content: 'exemaple of content',
      title: 'example of title',
    });

    expect(post.isPublish).toBeTruthy();
    expect(post.createdAt).toBeInstanceOf(Date);
  });
});
