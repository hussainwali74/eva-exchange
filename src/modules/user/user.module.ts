import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './dto/user.entity';
import { UserToShareEntity } from './dto/usertoshare.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            UserToShareEntity,
        ]),
        SharedModule,
        AuthModule,
    ],
    controllers: [UserController],
    providers: [
        UserService
    ],
    exports: [UserService]
})
export class UserModule { }
