import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    PostModule, UserModule
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}
