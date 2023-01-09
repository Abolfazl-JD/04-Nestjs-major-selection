import { Expose } from 'class-transformer'
export class MajorDto {
    @Expose()
    major: string

    @Expose()
    code: string

    @Expose()
    university: string

    @Expose()
    educationCourse: string

    @Expose()
    id: string

    @Expose()
    order: string
}