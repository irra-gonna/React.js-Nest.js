import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../User/user.module';
import { User } from '../User/user.entity';
import { UserService } from '../User/user.service';
import { PostController } from './post.controller';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]),forwardRef(() => UserModule)],
  controllers: [PostController],
  providers: [PostService],
  exports : [PostModule, PostService],
})
export class PostModule {}