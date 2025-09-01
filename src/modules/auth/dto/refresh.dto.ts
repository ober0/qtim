import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RefreshBaseDto {
    @ApiProperty()
    @IsString()
    refreshToken: string
}

export class RefreshResponseDto extends RefreshBaseDto {
    @ApiProperty()
    @IsString()
    accessToken: string
}
