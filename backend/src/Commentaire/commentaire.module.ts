import {forwardRef, Module, Post} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../Post/post.module';
import { UserModule } from '../User/user.module';
import { CommentaireController } from './commentaire.controller';
import { Commentaire } from './commentaire.entity';
import { CommentaireService } from './commentaire.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Commentaire]),
        forwardRef(() => UserModule),
        forwardRef(() => PostModule),
    ],
    controllers: [CommentaireController],
    providers: [CommentaireService],
    exports : [CommentaireModule, CommentaireService]
})

export class CommentaireModule {}