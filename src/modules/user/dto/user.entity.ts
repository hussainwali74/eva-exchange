import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ShareEntity } from 'src/modules/share/dto/share.entity';
import { TradeEntity } from 'src/modules/share/dto/trade.entity';
import { SharedEntity } from 'src/shared/shared.entity';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserToShareEntity } from './usertoshare.entity';

@Entity('user')
export class UserEntity extends SharedEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({
        type: String,
        example: 'CUmar Khan',
    })
    @IsNotEmpty()
    @Column({ length: 60, type: 'varchar' })
    name: string;

    @ApiProperty({
        type: String,
        example: 'manager@xec.com',
        nullable: false
    })
    @Column({ length: 160, type: 'varchar', nullable: false, default: null })
    email: string;

    @ApiProperty({
        type: String,
        example: 'helo',
        nullable: false
    })
    @Column({ length: 110, type: 'varchar', nullable: false, default: null })
    password: string;

    @ApiProperty({
        type: Boolean,
        example: false,
        nullable: true
    })
    @Column({ type: 'bool', nullable: true, default: false })
    registered: boolean;

    //one user can have many shares,
    @OneToMany(() => UserToShareEntity, userToShare => userToShare.user, { eager: true, cascade: ['insert', 'update'] })
    userToShare?: UserToShareEntity[]

    //one user can have many trades,
    @OneToMany(() => TradeEntity, trade => trade.buyer, { eager: true, cascade: ['insert', 'update'] })
    trade?: TradeEntity[]
}