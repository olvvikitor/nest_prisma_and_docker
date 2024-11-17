import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { UserRepository } from 'src/user/infra/prisma/repository/user.repository';

@Module({
  imports:[PrismaModule],
  controllers:[UserController],
  providers:[UserService,UserRepository],
  exports:[UserService, UserRepository]
})
export class UserModule{}