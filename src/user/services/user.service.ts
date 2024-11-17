import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/infra/prisma/repository/user.repository';
import { CreateUserDto } from '../domain/dto/create-user-dto';
import { User } from '../domain/entities/user';

@Injectable()
export class UserService{
  constructor (
    @Inject()
    private userRepository:UserRepository) {}
  
  async createUser(createUserDto: CreateUserDto):Promise<User>{
    const user = await this.userRepository.findUser({email: createUserDto.email})
    if(user){
      throw new ConflictException
    }
    return await this.userRepository.create({
      email: createUserDto.email,
      name: createUserDto.name
    })
  }
}