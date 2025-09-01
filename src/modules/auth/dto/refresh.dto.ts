import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RefreshResponseDto {
    @ApiProperty()
    accessToken: string

    @ApiProperty()
    refreshToken: string
}

export class RefreshBaseDto {
    @ApiProperty()
    @IsString()
    refreshToken: string
}
