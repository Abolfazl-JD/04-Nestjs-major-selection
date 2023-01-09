import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { ChangePriorities } from './dtos/change-priorities.dto';
import { CreateMajorDto } from './dtos/create-major.dto';
import { EditMajorDto } from './dtos/edit-major.dto';
import { MajorsService } from './majors.service';
import { User } from './../users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MajorDto } from './dtos/major.dto';

@Controller('/api/v1/majors')
@UseGuards(AuthGuard)
@Serialize(MajorDto)
export class MajorsController {

    constructor(private majorsService: MajorsService){}

    @Get()
    getMajors(@CurrentUser() user: User) {
        return this.majorsService.getMajors(user)
    }

    @Post()
    addNewMajor(@Body() majorDetails: CreateMajorDto, @CurrentUser() user: User) {
        return this.majorsService.createMajor(majorDetails, user)
    }

    @Delete('/:id')
    removeMajor(@Param('id') id: number, @CurrentUser() user: User) {
        return this.majorsService.removeMajor(id, user)
    }

    @Patch('/:id')
    updateMajor(@Param('id') id: number, @Body() majorDetails: EditMajorDto) {
        return this.majorsService.editMajor(id, majorDetails)
    }

    @Patch('/:firstMajorId/:secondMajorId')
    changeMajorPriorities(@Param() majorIds: ChangePriorities) {
        const { firstMajorId, secondMajorId } = majorIds
        return this.majorsService.changeMajorPriorities(+firstMajorId, +secondMajorId)
    }
}
