import { Post } from '../entities/post';

describe('Create Post', () => {
  it('Should be able to create post', () => {
    const post = new Post({
      title: 'titulo do post',
      content: 'content do post',
      authorId: '898-233-2323',
    });

    expect(post.id).toBeTruthy();
    expect(post.createdAt).toBeInstanceOf(Date);
    expect(post.isPublish).toBe(true);
  });

  it('Should be able to create a private post', () => {
    const post = new Post({
      title: 'titulo do post',
      content: 'content do post',
      authorId: '898-233-2323',
      isPublish: false,
    });

    expect(post.isPublish).toBe(false);
  });
});
