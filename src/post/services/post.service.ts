import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../domain/entities/post';
import { CreatePostDto } from '../domain/dto/create-post-dto';
import { UserRepository } from 'src/user/infra/prisma/repository/user.repository';
import { PostRepository } from '../infra/prisma/repositories/post.repository';

@Injectable()
export class PostService{
  constructor(
    @Inject()
    private postRepository : PostRepository,
    @Inject()
    private userRepository : UserRepository
  ) {
  }
  async createPost(createPostDto: CreatePostDto):Promise<Post>{
    const author = await this.userRepository.findUser({email: createPostDto.authorEmail})
    if(!author){
      throw new NotFoundException
    }
    const postModel = await this.postRepository.create({
      content: createPostDto.content,
      title: createPostDto.title,
      author:{connect: {email:createPostDto.authorEmail}}
    });

    return {
      title : postModel.title,
      content: postModel.content,
      author: author,
      authorId : postModel.authorId,
      id: postModel.id,
      publicado: postModel.publicado
    }
  }
}