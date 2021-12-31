import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from '../Post/post.module';
import { CommentaireModule } from '../Commentaire/commentaire.module';
import { CommentaireService } from '../Commentaire/commentaire.service';
import { PostService } from '../Post/post.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CommentaireModule),
    forwardRef(() => PostModule),
    JwtModule.register({
      // get from the env file !!!
      secret : 'secret',
      signOptions : {
        expiresIn : '3600s'
      }
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserModule, UserService]
})
export class UserModule {}
