import { IsNotEmpty } from 'class-validator';
import { User } from '../../User/user.entity';

export class PostCreationDto {
  @IsNotEmpty()
  title!: string;


	@IsNotEmpty()
	content!: string;

}
