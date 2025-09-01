import { IsUUID, IsString, IsInt, IsDate, IsOptional, ValidateNested } from 'class-validator'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { UserBaseDto } from './base.dto'

export class UserCreateDto {
    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    lastName: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    patronymic?: string
}
