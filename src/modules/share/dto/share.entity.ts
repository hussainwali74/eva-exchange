import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, MaxLength } from 'class-validator';
import { UserToShareEntity } from 'src/modules/user/dto/usertoshare.entity';
import { SharedEntity } from 'src/shared/shared.entity';
import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TradeEntity } from './trade.entity';

@Entity('share')
export class ShareEntity extends SharedEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({
        type: String,
        example: 'DEX',
    })
    @IsNotEmpty()
    @MaxLength(3)
    @Column({ length: 3, type: 'char' })
    symbol: string;

    @ApiProperty({
        description: 'most recent price of the share',
        type: Float64Array,
        example: '2.22',
    })
    @IsNotEmpty()
    @IsDecimal()
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    price: number;

    @ApiProperty({
        type: Boolean,
        example: false,
        nullable: true
    })
    @Column({ type: 'bool', nullable: true, default: true })
    registered: boolean;

    //one user can have many shares,
    @OneToMany(() => UserToShareEntity, userToShare => userToShare.share, { eager: true, cascade: ['insert', 'update'] })
    userToShare?: UserToShareEntity[]

    //one share can have multiple trades,
    @OneToMany(() => TradeEntity, trade => trade.share, { nullable: true, eager: true, cascade: ['insert', 'update'] })
    trade?: TradeEntity[]

    @BeforeInsert()
    convertSymbolToUppercase() {
        this.symbol = this.symbol.toUpperCase()
    }
}