import { IsUUID, IsString, IsInt, IsDate, IsOptional, ValidateNested } from 'class-validator'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { UserBaseDto } from './base.dto'

export class UserResponseDto extends OmitType(UserBaseDto, ['password']) {}
export class UserResponseWithUserDto extends UserBaseDto {}
