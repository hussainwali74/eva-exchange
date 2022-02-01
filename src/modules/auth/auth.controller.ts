import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomApiCreateOperations, postCustomApiPostResponse, SharedService } from 'src/shared/shared.service';
import { UserEntity } from '../user/dto/user.entity';
import { UserService } from '../user/user.service';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private sharedService: SharedService
    ) { }


    // =================================================================
    //                  POST REQUESTS
    // =================================================================

    // ------------------------------------------------
    // POST login
    // protected
    // ------------------------------------------------

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // verify user email
        let user;
        try {
            user = await this.userService.findOneByConditions({ where: { email: loginDto.email } })
            if (!user) {
                return this.sharedService.handleError({ message: 'No User with the given credentials', status: HttpStatus.NOT_FOUND })
            }
        } catch (error) {
            return this.sharedService.handleError(error)
        }

        // verify user password
        try {
            const comparePasswordResult = await this.authService.comparePassword(loginDto.password, user.password)
            if (!comparePasswordResult) {
                return this.sharedService.handleError({ message: 'invalid credentials', status: HttpStatus.NOT_FOUND })
            }

        } catch (error) {
            return this.sharedService.handleError(error)
        }

        // generate JWT and return
        const payload = {
            email: user.email,
            user_id: user.id
        }

        try {
            const token = await this.authService.signPayload(payload);
            let { password, ...userfinal } = user;
            return this.sharedService.handleSuccess({ userfinal, token });
        } catch (error) {
            return this.sharedService.handleError(error);
        }
    }

    // ------------------------------------------------
    // POST register new user
    // protected
    // ------------------------------------------------
    @ApiCreatedResponse({
        description: 'user registered successfully',
    })
    @ApiResponse(postCustomApiPostResponse('user'))
    @ApiBody({ type: UserEntity, required: true })
    @ApiOperation(CustomApiCreateOperations('user'))
    @Post('register')
    async register(@Body() userEntity: UserEntity) {
        // check if user already registered
        // send error

        const userCheck = await this.userService.findOneByConditions({ email: userEntity.email })

        if (userCheck) {
            return this.sharedService.handleError(`User already registered with these credentials`)
        }

        try {
            userEntity.password = await this.authService.hashPassword(userEntity.password)
        } catch (error) {
            return this.sharedService.handleError(error)
        }

        //create user with encrypted password
        const user = await this.userService.create(userEntity)

        //sign jwt
        try {
            const payload = {
                email: user.email,
                id: user.id,
                name: user.name
            }

            const token = await this.authService.signPayload(payload)

            return this.sharedService.handleSuccess({ user, token })
        } catch (error) {
            return this.sharedService.handleError(error)
        }
    }

}
