import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from '../user/user.module';
import { ShareEntity } from './dto/share.entity';
import { TradeEntity } from './dto/trade.entity';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ShareEntity,
            TradeEntity
        ]),
        SharedModule,
        UserModule
    ],
    controllers: [ShareController],
    providers: [
        ShareService
    ]
})
export class ShareModule { }
