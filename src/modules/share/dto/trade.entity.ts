import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ShareEntity } from 'src/modules/share/dto/share.entity';
import { UserEntity } from 'src/modules/user/dto/user.entity';
import { SharedEntity } from 'src/shared/shared.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

//this table has record of a how many shares a user has
@Entity('trade')
export class TradeEntity extends SharedEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ type: Number, example: 2.2 })
    @IsNumber()
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    price: number

    @ApiProperty({ type: Number, example: 2 })
    @IsNumber()
    @IsNotEmpty()
    @Column({ type: 'int', })
    amount: number

    @ApiProperty()
    @ManyToOne(() => UserEntity, buyer => buyer.trade, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'buyer_id', referencedColumnName: 'id' })
    buyer: UserEntity | number;

    @ApiProperty()
    @ManyToOne(() => UserEntity, seller => seller.trade, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'seller_id', referencedColumnName: 'id' })
    seller: UserEntity | number;

    @ApiProperty()
    @ManyToOne(() => ShareEntity, share => share.trade, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'share_id', referencedColumnName: 'id' })
    share!: ShareEntity | number;

}
