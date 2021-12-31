import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserDTO } from './dto/userDTO';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  createUser(@Body() data: UserDTO): string {
    data.created_at = JSON.stringify(new Date());
    data.updated_at = JSON.stringify(new Date());
    data = Object.assign(new User(), data);
    return this.userService.createUser(data);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    const token = await this.userService.login(email, password);

    response.cookie('jwtToken', token);

    return {
      message: 'Logged in Succesfully',
    };
  }

  @Get(':username')
  getPostById(@Param('username') username: string) {
    return this.userService.getUserBuyUsername(username);
  }

  @Get()
  getUserByToken(@Req() request: Request) : Promise<User>{
    const cookie = request.cookies['jwtToken'];
    return this.userService.authentificationByToken(cookie);
  }

  @Post('all')
  async getAllUsers(@Req() request: Request): Promise<User[]> {
    const cookie = request.cookies['jwtToken'];
    const user = await this.userService.authentificationByToken(cookie);
    return await this.userService.getAllUser();
  }

  @Delete('delete/self')
  deletePost(@Req() request: Request) {
    const cookie = request.cookies['jwtToken'];
    return this.userService.authentificationByToken(cookie).then((response) => {
      return this.userService.deleteSelf(response);
    });
  }

  @Patch('update')
  async updateUser (
    @Body() toPatch : UserDTO,
    @Req() request: Request,
  ) : Promise<{message : string}> {
    const cookie = request.cookies['jwtToken'];
    const user = await this.userService.authentificationByToken(cookie);
    user.updated_at = JSON.stringify(new Date());
    return await this.userService.patch(Object.assign(new User(), user))

  }
}
