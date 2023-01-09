import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Major } from './major.entity';
import { CreateMajorDto } from './dtos/create-major.dto';
import { EditMajorDto } from './dtos/edit-major.dto';
import { User } from './../users/user.entity';

@Injectable()
export class MajorsService {
    
    constructor(
        @InjectRepository(Major) private majorsRepository: Repository<Major>) { }
    
    async getMajors(user: User) {
        return this.majorsRepository.find({
            relations: { user: true },
            where : { user }
        })
    }

    async createMajor(majorDetails: CreateMajorDto, currentUser: User) {
        const newMajor = this.majorsRepository.create(majorDetails)
        newMajor.user = currentUser
        return this.majorsRepository.save(newMajor)
    }

    async removeMajor(majorId: number, user: User) {
        const major = await this.getMajorById(majorId)
        this.majorsRepository.delete(major)
        return { success: true, msg: 'the major was deleted successfully' }
    }

    async editMajor(majorId: number, majorDetails: EditMajorDto) {
        const major = await this.getMajorById(majorId)

        return this.majorsRepository.save({ ...major, ...majorDetails })
    }

    async changeMajorPriorities(firstMajorId: number, secondMajorId: number) {
        // get majors
        const firstMajor = await this.getMajorById(firstMajorId)
        const secondMajor = await this.getMajorById(secondMajorId)
        // save major orders
        const firstMajorOrder = firstMajor.order
        const secondMajorOrder = secondMajor.order
        // switch major orders
        firstMajor.order = secondMajorOrder
        secondMajor.order = firstMajorOrder
        // save changes
        this.majorsRepository.save(firstMajor)
        this.majorsRepository.save(secondMajor)
        // send user success message
        return { success: true, msg: 'major priorities has been successfully changed' }
    }

    async getMajorById(id: number) {
        const major = await this.majorsRepository.findOneBy({ id })
        if (!major) throw new NotFoundException(`major with id ${id} was not found`)
        return major
    }
}
