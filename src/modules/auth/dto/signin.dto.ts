import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class SignInResponseDto {
    @ApiProperty()
    accessToken: string
    @ApiProperty()
    refreshToken: string
}

export class SignInBaseDto {
    @ApiProperty({ default: 'string@gmail.com' })
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}
