import {
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToShareEntity } from '../user/dto/usertoshare.entity';
import { UserService } from '../user/user.service';
import { ShareEntity } from './dto/share.entity';
import { TradeEntity } from './dto/trade.entity';

@Injectable()
export class ShareService {
    constructor(
        @InjectRepository(ShareEntity)
        private shareRepository: Repository<ShareEntity>,
        @InjectRepository(TradeEntity)
        private tradeRepository: Repository<TradeEntity>,
        private userService: UserService
    ) { }

    async create(share: ShareEntity) {
        try {
            const data = this.shareRepository.create(share);
            return await this.shareRepository.save(data);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async findOneByConditions(conditions: any) {
        try {
            return await this.shareRepository.findOne(conditions);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async findAll() {
        try {
            return await this.shareRepository.find();
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async deleteOne(id: number) {
        try {
            const share = await this.findOneByConditions(id);
            return await this.shareRepository.remove(share);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async updateOne(id: number, share: ShareEntity) {
        await this.findOneByConditions(id)
        try {
            return await this.shareRepository.update(id, share);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
        }
    }
    //===============================================trade
    async buy(trade: TradeEntity) {
        try {
            const data = this.tradeRepository.create(trade);
            return await this.tradeRepository.save(data);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async sell(trade: TradeEntity) {
        try {

            const data = this.tradeRepository.create(trade);
            const result1 = await this.tradeRepository.save(data);

            const seller_share = await this.userService.findUserTOShare1ByConditions({ user: trade.seller })
            const buyer_share = await this.userService.findUserTOShare1ByConditions({ user: trade.buyer })
            const updateSellerShares: UserToShareEntity = {
                amount: seller_share.amount - trade.amount,
                price: trade.price,
                id: seller_share.id,
                user: trade.seller,
                share: trade.share
            }

            const buyer_share_amount = buyer_share ? buyer_share?.amount : 0
            const updateBuyerShares: UserToShareEntity = {
                amount: buyer_share_amount + trade.amount,
                price: trade.price,
                id: buyer_share?.id,
                user: trade.buyer,
                share: trade.share
            }

            await this.userService.updateUserToShare(seller_share.id, updateSellerShares)
            if (!buyer_share) {
                await this.userService.addToUserShare(updateBuyerShares)
            } else {
                await this.userService.updateUserToShare(buyer_share.id, updateBuyerShares)
            }
            return 1
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
        }
    }
}