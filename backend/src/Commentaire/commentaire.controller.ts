import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Logger,
    Param,
    Patch,
    Post,
    Req,
    Res,
  } from '@nestjs/common';
  import { Response, Request } from 'express';
import { PostEntity } from '../Post/post.entity';
import { PostService } from '../Post/post.service';
import { UserService } from '../User/user.service';
import { Commentaire } from './commentaire.entity';
import { CommentaireService } from './commentaire.service';
import { CommentaireDTO } from './dto/commentaireDTO';

  @Controller('Commentaire')
  export class CommentaireController {
    constructor (
      private readonly commentaireService : CommentaireService,
      private readonly userService : UserService,
      private readonly postService : PostService
    ) {
        
    }

    @Post('create')
    async createCom (
      @Body('text') text : string,
      @Body('idPost') idPost : string,
      @Req() request: Request
    ) {
      if (idPost === undefined || text === undefined) {
        throw new HttpException("One or Two argument is missing", 401)
      }
      const cookie = request.cookies["jwtToken"]
      const user = await this.userService.authentificationByToken(cookie)
      const post = await this.postService.getPostById(idPost)
      return this.commentaireService.createCommentaire(text, user, post)
    }

    @Delete('delete')
    async deleteCommentaire (
      @Body('id') id: string,
      @Req() request : Request,
    ): Promise<{ message: string; }> {
      if (id === undefined) {
        return {message : 'Aucun id n a été envoyer'}
      }
      const user = this.userService.authentificationByToken(request.cookies['jwtToken'])
      return await this.commentaireService.deleteCommentaire(id)
    }

    @Get('all')
    async getAll (

    ) : Promise<Commentaire[]> {
      return await this.commentaireService.getAll()
    }

    @Patch('update')
    async update (
      @Body() topatch : Commentaire,
      @Req() request: Request,
    ) {
      return await this.commentaireService.update(topatch)
    }

  }