import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
