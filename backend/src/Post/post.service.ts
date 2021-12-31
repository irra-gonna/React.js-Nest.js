/* eslint-disable prettier/prettier */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostCreationDto } from './dto/post.creation.dto';
import { PostPatchDto } from './dto/post.patch.dto';
import { Logger } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { UserService } from '../User/user.service';
import { User } from 'src/User/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly userService : UserService,
  ) {}
  async getAllPost(): Promise<PostEntity[]> {
    return await this.postRepository.find({relations : ['user']});
  }

  async getPostById(id: string) : Promise<PostEntity> {
    return await this.postRepository.findOne(id).catch(() => {
      throw new HttpException(
        `Post with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    });
  }

  async savePost(newPost: PostCreationDto, cookie : string): Promise<unknown> {
    
    const toSave = Object.assign(new PostEntity(), newPost);
    Logger.log(cookie)
    toSave.user = await this.userService.authentificationByToken(cookie)
    const savedPost = await this.postRepository.save(toSave).catch( (e : Error) => {
      throw new HttpException("cannot add posts : " + e.message, 401)
    }
    );
    let userupdate = toSave.user as User
    toSave.user = null
    if (userupdate.posts === undefined) {
      userupdate.posts = [toSave]
    } else {
      userupdate.posts.push(toSave)
    }
    this.userService.updateUser(userupdate)
    return {
      savedPost: savedPost,
      user : userupdate,
      message: 'Post successfully created',
    };
  }

  async patchPost(id: string, toPatch: PostPatchDto): Promise<PostEntity> {
    const dbPost = await this.postRepository.findOne(id);
    if (!dbPost) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updated: PostEntity = Object.assign(dbPost, toPatch);
    Logger.log(updated);
    const finish = await this.postRepository.save(updated);
    return finish;
  }

  async deletePost(id: string) {
    const delPost = await this.postRepository.delete(id);
    return {
      delPost,
      message: 'Post successfully deleted',
    };
  }
}
