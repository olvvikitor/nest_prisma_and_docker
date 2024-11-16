import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    @Inject()
    private readonly userService:UserService,
    @Inject()
     private postService : PostService) {}

  @Post('/user')
  async createUser(@Body() userData : { name: string, email: string}):Promise<UserModel>{
    return await this.userService.create(userData)
  }
  @Get('/user')
  async findAll(@Param('filter') filter? : string):Promise<UserModel[]>{
    return await this.userService.findAllUsers({})
  }

}
