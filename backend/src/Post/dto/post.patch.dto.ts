import { IsOptional } from 'class-validator';

export class PostPatchDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  created_at?: string;
}
