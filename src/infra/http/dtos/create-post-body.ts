import { IsBoolean, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreatePostBody {
  @IsBoolean()
  @IsOptional()
  isPublish?: boolean;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  authorUrl?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
