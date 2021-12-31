import { BadRequestException, HttpCode, HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Commentaire } from '../Commentaire/commentaire.entity'
import { User } from '../User/user.entity';
import { PostEntity } from '../Post/post.entity';
import { CommentaireDTO } from './dto/commentaireDTO';
import { UserService } from '../User/user.service';

@Injectable()
export class CommentaireService {
    constructor (
        @InjectRepository(Commentaire)
        private commentaireRepository : Repository<Commentaire>,
        private readonly userService : UserService
    ) {

    }

    async createCommentaire (text : string, user : User, post : PostEntity) : Promise<Commentaire>{
        const commentaire = Object.assign(new Commentaire() , new CommentaireDTO(text, user, post))
        commentaire.created_at = JSON.stringify(new Date())
        commentaire.updated_at = JSON.stringify(new Date())
        const com = await this.commentaireRepository.save(commentaire).catch((e : Error) => {
            throw new HttpException("Could not add to the database !" + e.message, 401)
        })
        return com

    }

    async deleteCommentaire (id : string) : Promise<{message : string }> {
        await this.commentaireRepository.delete(id).catch((e : Error) => {
            throw new HttpException("Can't delete with this id" + e.message, 401)
        })
        return {message : "succesfully deleted"}
    }

    async getAll() : Promise<Commentaire[]> {
        return await this.commentaireRepository.find({
            relations : ['user', ]
        }).catch( (e : Error) => {
            throw new HttpException("Problem while getting all coms" + e.message, 401)
        })
    }

    async update (topatch : Commentaire) : Promise<{message : string}> {
        await this.commentaireRepository.save(topatch).catch((e : Error) => {
            throw new HttpException("can t update commentaires " + e.message, 401)
        })
        return {message : "Updated !"}
    }
}
