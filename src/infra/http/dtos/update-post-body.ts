import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdatePostbody {
  @IsBoolean()
  @IsOptional()
  isPublish?: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
