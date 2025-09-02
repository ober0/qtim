import { IsUUID, IsString, IsNotEmpty, MaxLength, IsDate, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { UserBaseDto } from '../../user/dto/base.dto'

export class ArticleBaseDto {
    @ApiProperty()
    @IsUUID()
    id: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string

    @ApiProperty()
    @IsString()
    content: string

    @ApiProperty()
    @IsDate()
    createdAt: Date

    @ApiProperty()
    @IsDate()
    updatedAt: Date

    @ApiProperty({ type: UserBaseDto })
    @ValidateNested()
    @Type(() => UserBaseDto)
    author?: UserBaseDto

    @ApiProperty()
    @IsUUID()
    authorId: string
}
