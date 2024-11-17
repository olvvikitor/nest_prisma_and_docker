import { Inject, Injectable } from '@nestjs/common';
import { Post, Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PostRepository{
  constructor(
    @Inject()
    private prisma: PrismaService){}

  async findPost(where: Prisma.PostWhereUniqueInput):Promise<Post | null >{
    return await this.prisma.post.findUnique({
      where
    })
  }
  async findAll(params:{
    skip?:number,
    take?: number,
    cursor?: Prisma.PostWhereUniqueInput,
    where?: Prisma.PostWhereInput,
    orderBy?: Prisma.PostOrderByWithRelationInput
  }):Promise<Post[]>{
    const {skip, take, cursor, where, orderBy} = params
    return await this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where, 
      orderBy
    })
  }
  async create(data:Prisma.PostCreateInput):Promise<Post>{
     return await this.prisma.post.create({
      data,
      
    })
  }
  async update(where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput):Promise<Post>{
    return await this.prisma.post.update({
      where, data
    })
  }
  async delete (where: Prisma.PostWhereUniqueInput):Promise<Post>{
    return await this.prisma.post.delete({ where })
  }
}