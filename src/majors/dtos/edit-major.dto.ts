import { IsOptional, IsNumber } from 'class-validator'

export class EditMajorDto {
    @IsOptional()
    major: string

    @IsOptional()
    @IsNumber()
    code: number

    @IsOptional()
    university: string

    @IsOptional()
    educationCourse : string
}