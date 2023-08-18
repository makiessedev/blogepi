import { randomUUID } from 'crypto';

interface PostProps {
  id?: string;
  isPublish?: boolean;
  title: string;
  content: string;
  description: string;
  imageUrl?: string;
  userId: string;
  author?: string;
  authorUrl?: string;
  views?: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export class Post {
  constructor(private props: PostProps) {
    if (!this.props.id) this.props.id = randomUUID();
    if (!this.props.createdAt) this.props.createdAt = new Date();
    if (this.props.isPublish === undefined) this.props.isPublish = true;
    if (this.props.views === undefined) this.props.views = 0;
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

  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
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

  get userId(): string {
    return this.props.userId;
  }

  set userId(value: string) {
    this.props.userId = value;
  }

  get author(): string {
    return this.props.author;
  }

  set author(value: string) {
    this.props.author = value;
  }

  get authorUrl(): string {
    return this.props.authorUrl;
  }

  set authorUrl(value: string) {
    this.props.authorUrl = value;
  }

  toView() {
    this.props.views++;
  }

  get views(): number {
    return this.props.views;
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
