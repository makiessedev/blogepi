import { IsBoolean, IsString } from 'class-validator';

export class CreatePostBody {
  @IsBoolean()
  isPublish?: boolean;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
