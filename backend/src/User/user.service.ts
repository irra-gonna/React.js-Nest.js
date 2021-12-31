import { BadRequestException, HttpException, Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CommentaireService } from '../Commentaire/commentaire.service';
import { PostService } from '../Post/post.service';
import { UserModule } from './user.module';
import { Commentaire } from '../Commentaire/commentaire.entity';

@Injectable()
export class UserService {
  md5 = require('md5')
  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
    private jwtService : JwtService,
  ) {
  }

  async getUserBuyUsername (username : string) : Promise<User> {
    return await this.userRepository.findOne({
      where : { username : username},
      relations : ['posts']
    })
  }

  updateUser (user) {
    try {
      this.userRepository.save(user)
    } catch (e) {
      return "there is an error --> see Exception message : " + e.message
    }
  }

  createUser (user : User) : string {
    try {
      user.password = this.md5(user.password)
      user.commentaires = []
      user.posts = []
      this.userRepository.save(user)
      return "Added Succesfully"
    } catch (e) {
      return "there is an error --> see Exception message : " + e.message
    }
  }

  async findOneUserByEmail(email : string) : Promise<User> {
    return this.userRepository.findOneOrFail(
      {
      where : { email : email }
      }
    ).then((response) => {
      return response
    })
  }

  async login (email : string, password : string) : Promise<string>{
    const user = await this.findOneUserByEmail(email)
    if (!user) {
      throw new HttpException("Email don't exist in database", 401);
    }
    if (user.password !== this.md5(password)) {
      throw new HttpException("Password don't match", 401)
    }

    const jwt = this.jwtService.sign({id : user.idUser})

    return jwt
  }

  async authentificationByToken(cookie : string) : Promise<User> {
   
    try {
      
      const data = await this.jwtService.verifyAsync(cookie)
      
      return this.userRepository.findOne(data.id).then((response) => {
        return response
      })
    } catch (e) {
      throw new HttpException("Token expired" , 500)
    }
  }

  async getAllUser() : Promise<User[]> {
    const user = await this.userRepository.find()
    return user;
  }
  
  async deleteSelf(user : User) : Promise<{message : string}> {
    try {
      this.userRepository.delete(user.idUser)
      return {message : "deleted succesfully"}
    } catch (e) {
      throw new HttpException("User was not deleted successfully", 500)
    } 
  }

  async patch (ready : User) : Promise<{message : string}> {
    this.userRepository.save(ready).catch((e : Error) => {
      throw new HttpException("Cannot update this user " + e.message, 401)
    })
    return {message : "updated"}
  }

}
