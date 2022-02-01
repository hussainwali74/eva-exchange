import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    HttpStatus
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
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UserEntity } from './dto/user.entity';
import { BuyShareDto } from './dto/buyshare.dto'
import { LoginDto } from '../auth/dto/login.dto';
import { UserToShareEntity } from './dto/usertoshare.entity';

@ApiUnauthorizedResponse({ description: 'please provide a valid token' })

@ApiBearerAuth('token')
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private sharedService: SharedService,
        private authService: AuthService
    ) { }

    // =================================================================
    //                  GET REQUESTS
    // =================================================================

    // ------------------------------------------------
    // GET get all users
    // protected
    // ------------------------------------------------
    @ApiOperation({ summary: 'get user by id' })
    @ApiResponse(getCustomApiGetResponse(UserEntity))
    @Get('/id/:id')
    async findOne(@Param('id') id: number) {
        try {
            var data = await this.userService.findOneByConditions(id);
            return this.sharedService.handleSuccess(data);
        } catch (error) {
            return this.sharedService.handleError(error);
        }
    }

    // ------------------------------------------------
    // GET get all users
    // protected
    // ------------------------------------------------
    @ApiOperation({ summary: 'get list of all users' })
    @ApiResponse(getCustomApiGetResponse(UserEntity))
    @Get()
    async findAll() {
        try {
            var data = await this.userService.findAll();
            console.log(data)
        } catch (error) {
            return this.sharedService.handleError(error);
        }
        return this.sharedService.handleSuccess(data);
    }

    // =================================================================
    //                  POST REQUESTS
    // =================================================================

    // ------------------------------------------------
    // POST add shares to user account
    // protected
    // ------------------------------------------------
    @ApiCreatedResponse({
        description: 'share added to user portfolio successfully',
    })
    @ApiResponse(postCustomApiPostResponse('share'))
    @ApiBody({ type: UserToShareEntity, required: true })
    @ApiOperation(CustomApiCreateOperations(null, 'Add Share to a user\'s portfolio '))
    @Post('add_shares_to_user')
    async register(@Body() buyShareDto: UserToShareEntity) {
        try {
            const result = await this.userService.addToUserShare(buyShareDto)
            return this.sharedService.handleSuccess(result, 'Share added to user portfolio successfully')
        } catch (error) {
            return this.sharedService.handleError(error);
        }
    }


    //create user is handled in auth controller
    //when a user register he is considered user by default
    // =================================================================
    //                  PUT REQUESTS
    // =================================================================

    // ------------------------------------------------
    // Update user
    // protected
    // ------------------------------------------------
    @ApiCreatedResponse({
        description: 'user updated successfully',
    })
    @ApiResponse(postCustomApiPostResponse('user'))
    @ApiBody({ type: UserEntity, required: false })
    @ApiOperation(CustomApiUpdateOperations('user'))
    @Put(':id')
    async updateOne(@Param('id') id: number, @Body() data: UserEntity) {
        try {
            await this.userService.updateOne(id, data);
        } catch (error) {
            return this.sharedService.handleError(error);
        }
        return this.sharedService.handleSuccess(
            null,
            'user updated successfully',
        );
    }

    // =================================================================
    //                  DELETE REQUESTS
    // =================================================================

    // ------------------------------------------------
    // DELETE user by id
    // protected
    // ------------------------------------------------
    @ApiCreatedResponse({
        description: 'user deleted  successfully',
    })
    @ApiResponse(postCustomApiPostResponse('user'))
    @ApiOperation(CustomApiDeleteOperations('user'))
    @Delete(':id')
    async deleteOne(@Param('id') id: number) {
        try {
            await this.userService.deleteOne(id);
        } catch (error) {
            return this.sharedService.handleError(error);
        }
        return this.sharedService.handleSuccess(
            null,
            'user deleted successfully',
        );
    }

}