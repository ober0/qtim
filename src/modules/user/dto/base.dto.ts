import { IsUUID, IsString, IsInt, IsDate, IsOptional, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class PasswordBaseDto {
    @ApiProperty()
    @IsUUID()
    id: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsDate()
    createdAt: Date

    @ApiProperty()
    @IsDate()
    updatedAt: Date
}

export class PersonBaseDto {
    @ApiProperty()
    @IsUUID()
    id: string

    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    lastName: string

    @ApiProperty({ type: String })
    @IsOptional()
    @IsString()
    patronymic?: string | null

    @ApiProperty()
    @IsDate()
    createdAt: Date

    @ApiProperty()
    @IsDate()
    updatedAt: Date
}

export class UserBaseDto {
    @ApiProperty()
    @IsUUID()
    id: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsInt()
    frontendId: number

    @ApiProperty()
    @IsDate()
    createdAt: Date

    @ApiProperty()
    @IsDate()
    updatedAt: Date

    @ApiProperty()
    @IsUUID()
    passwordId: string

    @ApiProperty()
    @IsUUID()
    personId: string

    @ApiProperty({ type: PasswordBaseDto })
    @ValidateNested()
    @Type(() => PasswordBaseDto)
    password: PasswordBaseDto

    @ApiProperty({ type: PersonBaseDto })
    @ValidateNested()
    @Type(() => PersonBaseDto)
    person: PersonBaseDto
}
