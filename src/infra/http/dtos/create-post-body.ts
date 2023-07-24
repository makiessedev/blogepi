import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreatePostBody {
  @IsBoolean()
  @IsOptional()
  isPublish?: boolean;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
