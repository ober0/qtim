import { UserService } from './user.service'
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { Controller, Get, UseGuards } from '@nestjs/common'

import { DecodeUser } from '../../common/decorators/decode-user.decorator'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { DecodeUserDto } from '../auth/dto/decode-user.dto'

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Получить информацию о себе' })
    @Get('self')
    @ApiSecurity('bearer')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: DecodeUserDto })
    async findOne(@DecodeUser() user: DecodeUserDto) {
        return this.userService.findOneById(user.id)
    }
}
