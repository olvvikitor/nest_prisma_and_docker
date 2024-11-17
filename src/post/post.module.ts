import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { PostService } from './services/post.service';
import { PostRepository } from 'src/post/infra/prisma/repositories/post.repository';
import { UserModule } from 'src/user/user.module';
import { PostController } from './controller/post.controller';

@Module({
  imports:[PrismaModule, UserModule],
  controllers:[PostController],
  providers:[PostService, PostRepository],
  exports:[PostService, PostRepository]
})
export class PostModule{

}