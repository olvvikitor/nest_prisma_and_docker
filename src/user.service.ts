import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService{
  constructor(private prisma: PrismaService){}

  async findUser(userWhereUniqueImput: Prisma.UserWhereUniqueInput):Promise<User|null>{
    return await this.prisma.user.findUnique({
      where: userWhereUniqueImput
    })}
    async findAllUsers(params:{
      skip?:number;
      take?:number;
      cursor?:Prisma.UserWhereUniqueInput;
      where?:Prisma.UserWhereInput;
      orderBy?:Prisma.UserOrderByWithRelationInput
    }):Promise<User[]>{
      const {skip,take,cursor,where, orderBy} = params
      return await this.prisma.user.findMany(params)
    }
    async create(params : Prisma.UserCreateInput):Promise<User>{
      return await this.prisma.user.create({data:params})
    }
    async update(params:{
      where: Prisma.UserWhereUniqueInput,
      data: Prisma.UserUpdateInput
    }):Promise<User|null>{
      const {where, data} = params
      return await this.prisma.user.update({
        where, data
      })
    }
  async delete(where: Prisma.UserWhereUniqueInput):Promise<User>{
    return await this.prisma.user.delete({
      where:where
    })
  }
}