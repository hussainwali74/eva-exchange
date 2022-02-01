import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './dto/user.entity';
import { UserToShareEntity } from './dto/usertoshare.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		@InjectRepository(UserToShareEntity)
		private userToShareRepository: Repository<UserToShareEntity>,
	) { }

	async create(user: UserEntity) {
		try {
			const data = this.userRepository.create(user);
			return await this.userRepository.save(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
		}
	}

	async findOneByConditions(options: any) {
		try {
			const { email } = options;
			let condition;
			if (email) {
				condition =
				{ where: { email } }
			} else {
				condition = options
			}

			return await this.userRepository.findOne(condition);
		} catch (error) {
			throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
		}
	}

	async findAll() {
		try {
			return await this.userRepository.find();
		} catch (error) {
			throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
		}
	}

	async deleteOne(id: number) {
		try {
			const user = await this.findOneByConditions(id);
			return await this.userRepository.remove(user);
		} catch (error) {
			throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
		}
	}

	async updateOne(id: number, user: UserEntity) {
		await this.findOneByConditions(id)
		try {
			return await this.userRepository.update(id, user);
		} catch (error) {
			throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
		}
	}
	//============================== user to share
	async addToUserShare(usertoshare: UserToShareEntity) {
		try {
			const data = this.userToShareRepository.create(usertoshare);
			return await this.userToShareRepository.save(data);
		} catch (error) {
			throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
		}
	}

	async findUserTOShare1ByConditions(options: any) {
		try {
			return await this.userToShareRepository.findOne(options);
		} catch (error) {
			throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
		}
	}
	async updateUserToShare(id: number, userToShare: UserToShareEntity) {
		await this.userToShareRepository.findOne(id);
		try {
			return await this.userToShareRepository.update(id, userToShare)
		} catch (error) {
			throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
		}
	}

}