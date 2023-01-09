import { Body, Controller, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateUserGuard } from '../guards/update-user.guard';

@Controller('/api/v1/users')
@Serialize(UserDto)
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('signup')
    async registerUser(@Body() userInfo: CreateUserDto, @Session() session: Record<string, any>) {
        const registeredUser = await this.usersService.registerUser(userInfo)
        session.userId = registeredUser.id
        return registeredUser
    }

    @Post('login')
    async loginUser(@Body() userInfo: LoginUserDto, @Session() session: Record<string, any>) {
        const loggedinUser = await this.usersService.loginUser(userInfo)
        session.userId = loggedinUser.id
        return loggedinUser
    }

    @UseGuards(UpdateUserGuard)
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() userInfo: UpdateUserDto) {
        return this.usersService.updateUser(+id, userInfo)
    }

    @Post('logout')
    logout(@Session() session: Record<string, any>) {
        session.userId = null
        return 'You have been successfully signed out'
    }
}
