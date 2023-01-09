import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateMajorDto {
    @IsNotEmpty()
    major: string

    @IsNotEmpty()
    @IsNumber()
    code: number

    @IsNotEmpty()
    university: string

    @IsNotEmpty()
    educationCourse : string
}