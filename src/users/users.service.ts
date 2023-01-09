import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { compare, genSalt, hash } from 'bcrypt'
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>){}

    async registerUser(userInfo: CreateUserDto) {
        userInfo.password = await this.encryptPassword(userInfo.password)
        const registeredUser = this.usersRepository.create(userInfo)
        return this.usersRepository.save(registeredUser)
    }

    async loginUser(userInfo: LoginUserDto) {
        const { gmail, password } = userInfo
        // check if the user with this gmail exist
        const user = await this.usersRepository.findOneBy({ gmail })
        if (!user) throw new UnauthorizedException('There is no account with this gmail')
        // check if the password is correct
        await this.checkPassword(password, user.password)

        return user
    }

    async updateUser(userId: number, userInfo: UpdateUserDto) {
        // find user by the given id
        const user = await this.getSingleUserById(userId)
        // if trying to edit password, check the old password is correct
        if (userInfo.oldPassword) {
            await this.checkPassword(userInfo.oldPassword, user.password)
            userInfo.password = await this.encryptPassword(userInfo.password)
        }
        // edit user
        return this.usersRepository.save({ ...user, ...userInfo })
    }

    async getSingleUserById(id: number) {
        const user = await this.usersRepository.findOneBy({ id })
        if (!user) throw new NotFoundException('user not found')
        return user
    }

    async encryptPassword(password: string) {
        const salt = await genSalt(10)
        return hash(password, salt)
    }

    async checkPassword(passToCheck: string, encryptedPass: string) {
        const isPasswordCorrect = await compare(passToCheck, encryptedPass)
        if(!isPasswordCorrect) throw new UnauthorizedException('password incorrect')
    }
}
