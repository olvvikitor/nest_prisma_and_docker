import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../domain/dto/create-user-dto';
import { User } from '../domain/entities/user';

@Controller('user')
export class UserController {
  constructor(
    @Inject()
    private userService: UserService){}
  @Post()
  async createUser(@Body() createUserDto : CreateUserDto):Promise<User>{
    return await this.userService.createUser(createUserDto)
  }
}