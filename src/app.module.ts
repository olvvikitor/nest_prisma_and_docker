import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostService } from './post.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, PostService],
  exports:[AppService, PrismaService, PostService, UserService]
})
export class AppModule {}
