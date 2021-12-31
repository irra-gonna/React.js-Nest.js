import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  Patch,
  Req,
  HttpException,
  Logger,
} from '@nestjs/common';
import { PostCreationDto } from './dto/post.creation.dto';
import { PostPatchDto } from './dto/post.patch.dto';

import { PostEntity } from './post.entity';

import { PostService } from './post.service';

import { Response, Request } from 'express'

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAll() {
    return this.postService.getAllPost();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Post()
  @HttpCode(201)
  createPost(@Body() createPost: PostCreationDto, @Body('cookie') cookie : string ,@Req() request : Request) {
    try {
      return this.postService.savePost(createPost, cookie);
    }catch(error){
      Logger.log("first catch")
      throw new HttpException("erreur message " + error.message, 401)
    }
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @Patch(':id')
  updatePost(
    @Body() toPatch: PostPatchDto,
    @Param('id') id: string,
  ): Promise<PostEntity> {
    return this.postService.patchPost(id, toPatch);
  }
}
