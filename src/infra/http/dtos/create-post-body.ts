import { IsBoolean, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreatePostBody {
  @IsBoolean()
  @IsOptional()
  isPublish?: boolean;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imageUrl: string;
}
