import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Commentaire } from './Commentaire/commentaire.entity';
import { CommentaireModule } from './Commentaire/commentaire.module';
import { PostEntity } from './Post/post.entity';
import { PostModule } from './Post/post.module';
import { User } from './User/user.entity';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    CommentaireModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'yowl',
      entities: [User, Commentaire, PostEntity],
      synchronize: false,
      migrationsRun: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
