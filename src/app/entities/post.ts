import { randomUUID } from 'crypto';

interface PostProps {
  id?: string;
  isPublish?: boolean;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export class Post {
  constructor(private props: PostProps) {
    if (!this.props.id) this.props.id = randomUUID();
    if (!this.props.createdAt) this.props.createdAt = new Date();
    if (this.props.isPublish === undefined) this.props.isPublish = true;
  }

  get id(): string {
    return this.props.id;
  }

  get isPublish(): boolean {
    return this.props.isPublish;
  }

  set isPublish(value: boolean) {
    this.props.isPublish = value;
  }

  get title(): string {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  get content(): string {
    return this.props.content;
  }

  set content(value: string) {
    this.props.content = value;
  }

  get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  set imageUrl(value: string) {
    this.props.imageUrl = value;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  set authorId(value: string) {
    this.props.authorId = value;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  update() {
    this.props.updatedAt = new Date();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
