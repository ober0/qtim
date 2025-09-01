import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsArray, IsEmail, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { UserResponseDto } from '../../user/dto/response.dto'
import { PersonBaseDto } from 'src/modules/user/dto/base.dto'

export class SignUpResponseDto extends UserResponseDto {
    @ApiProperty()
    accessToken: string
    @ApiProperty()
    refreshToken: string
}

export class SignUpBaseDto {
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty({ type: OmitType(PersonBaseDto, ['id', 'createdAt', 'updatedAt']) })
    @ValidateNested()
    @Type(() => OmitType(PersonBaseDto, ['id', 'createdAt', 'updatedAt']))
    person: Omit<PersonBaseDto, 'id' | 'createdAt' | 'updatedAt'>
}
