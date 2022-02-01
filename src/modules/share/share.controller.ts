import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
    CustomApiCreateOperations,
    CustomApiDeleteOperations,
    CustomApiUpdateOperations,
    getCustomApiGetResponse,
    postCustomApiPostResponse,
    SharedService,
} from 'src/shared/shared.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { ShareEntity } from './dto/share.entity';
import { TradeEntity } from './dto/trade.entity';
import { ShareService } from './share.service';

@ApiUnauthorizedResponse({ description: 'please provide a valid token' })

@ApiBearerAuth('token')
@UseGuards(JwtAuthGuard)
@ApiTags('Share')
@Controller('share')
export class ShareController {
    constructor(
        private shareService: ShareService,
        private userService: UserService,
        private sharedService: SharedService,) { }

    // =================================================================
    //                  GET REQUESTS
    // =================================================================

    // ------------------------------------------------
    // GET get share by id
    // protected
    // ------------------------------------------------
    @ApiOperation({ summary: 'get share by id' })
    @ApiResponse(getCustomApiGetResponse(ShareEntity))
    @Get('/id/:id')
    async findOne(@Param('id') id: number) {
        try {
            var data = await this.shareService.findOneByConditions(id);
            return this.sharedService.handleSuccess(data);
        } catch (error) {
            return this.sharedService.handleError(error);
        }
    }

    // ------------------------------------------------
    // GET get all shares
    // protected
    // ------------------------------------------------
    @ApiOperation({ summary: 'get list of all shares' })
    @ApiResponse(getCustomApiGetResponse(ShareEntity))
    @Get()
    async findAll() {
        try {
            var data = await this.shareService.findAll();
            return this.sharedService.handleSuccess(data);
        } catch (error) {
            return this.sharedService.handleError(error);
        }
    }

    // =================================================================
    //                  POST REQUESTS
    // =================================================================

    // ------------------------------------------------
    // POST create new share
    // protected
    // ------------------------------------------------
    @ApiCreatedResponse({
        description: 'share created successfully',
    })
    @ApiResponse(postCustomApiPostResponse('share'))
    @ApiBody({ type: ShareEntity, required: true })
    @ApiOperation(CustomApiCreateOperations('share'))
    @Post('register')
    async register(@Body() shareEntity: ShareEntity) {
        try {
            const result = await this.shareService.create(shareEntity)
            return this.sharedService.handleSuccess(result, 'Share created successfully')
        } catch (error) {
            return this.sharedService.handleError(error);
        }

    }

    // ------------------------------------------------
    // POST buy new share
    // protected
    // ------------------------------------------------
    @ApiCreatedResponse({
        description: 'share created successfully',
    })
    @ApiResponse(postCustomApiPostResponse('share'))
    @ApiBody({ type: TradeEntity, required: true })
    @ApiOperation(CustomApiCreateOperations(null, 'Buy Share'))
    @Post('buyShare')
    async buyShare(@Body() buyShare: TradeEntity, @GetUser() loggedin_user) {
        try {
            const buyer = await this.userService.findOneByConditions(loggedin_user.user_id)
            // if buyer not registered throw bad request

            const share = await this.shareService.findOneByConditions(buyShare.share)
            if (!buyer.registered || !share.registered) throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)

            //latest price of share
            buyShare.price = share.price

            buyShare.buyer = loggedin_user.user_id

            const result = await this.shareService.buy(buyShare)
            return this.sharedService.handleSuccess(result, 'Share created successfully')
        } catch (error) {
            return this.sharedService.handleError(error);
        }

    }

    // ------------------------------------------------
    // POST Sell Share
    // protected
    // ------------------------------------------------
    @ApiCreatedResponse({
        description: 'share sold successfully',
    })
    @ApiResponse(postCustomApiPostResponse('share'))
    @ApiBody({ type: TradeEntity, required: true })
    @ApiOperation(CustomApiCreateOperations(null, 'Sell Share'))
    @Post('sellShare')
    async sellShare(@Body() sellShare: TradeEntity, @GetUser() loggedin_user) {
        try {

            const buyer = await this.userService.findOneByConditions(sellShare.buyer)
            const seller = await this.userService.findOneByConditions(loggedin_user.user_id)
            const share = await this.shareService.findOneByConditions({ id: sellShare.share })
            // if seller or share not registered throw bad request

            if (!buyer || !seller || !share) throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
            if (!buyer?.registered || !seller?.registered || !share?.registered) throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)

            const seller_share = await this.userService.findUserTOShare1ByConditions({ user: loggedin_user.user_id })
            //if seller does not have the share or not sufficient shares to sell throw error            

            if (!seller_share || seller_share.amount < sellShare.amount) throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)

            //latest price of share
            sellShare.price = share.price
            sellShare.seller = loggedin_user.user_id;
            sellShare.buyer = buyer.id

            const result = await this.shareService.sell(sellShare)
            return this.sharedService.handleSuccess(result, 'Share sold successfully')
        } catch (error) {
            return this.sharedService.handleError(error);
        }

    }

    // =================================================================
    //                  PUT REQUESTS
    // =================================================================

    // ------------------------------------------------
    // Update share
    // protected
    // ------------------------------------------------
    @ApiCreatedResponse({
        description: 'share updated successfully',
    })
    @ApiResponse(postCustomApiPostResponse('share'))
    @ApiBody({ type: ShareEntity, required: false })
    @ApiOperation(CustomApiUpdateOperations('share'))
    @Put(':id')
    async updateOne(@Param('id') id: number, @Body() data: ShareEntity) {
        try {
            await this.shareService.updateOne(id, data);
            return this.sharedService.handleSuccess(
                null,
                'share updated successfully',
            );
        } catch (error) {
            return this.sharedService.handleError(error);
        }
    }

    // =================================================================
    //                  DELETE REQUESTS
    // =================================================================

    // ------------------------------------------------
    // DELETE share by id
    // protected
    // ------------------------------------------------
    @ApiCreatedResponse({
        description: 'share deleted  successfully',
    })
    @ApiResponse(postCustomApiPostResponse('share'))
    @ApiOperation(CustomApiDeleteOperations('share'))
    @Delete(':id')
    async deleteOne(@Param('id') id: number) {
        try {
            await this.shareService.deleteOne(id);
            return this.sharedService.handleSuccess(
                null,
                'share deleted successfully',
            );
        } catch (error) {
            return this.sharedService.handleError(error);
        }
    }

}