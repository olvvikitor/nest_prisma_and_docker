import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../domain/dto/create-post-dto';

@Controller('post')
export class PostController {
  constructor(@Inject()private postService: PostService) { }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto)
  }
}
