import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags, ApiOperation, ApiSecurity, ApiResponse, ApiOkResponse } from '@nestjs/swagger'
import { SignInBaseDto, SignInResponseDto } from './dto/signin.dto'
import { JwtAuthGuard } from './guards/auth.guard'
import { SignUpBaseDto, SignUpResponseDto } from './dto/singup.dto'
import { RefreshBaseDto, RefreshResponseDto } from './dto/refresh.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @ApiOperation({ summary: 'Регистрация пользователя' })
    @Post('signup')
    @ApiResponse({ type: SignUpResponseDto })
    async signup(@Body() dto: SignUpBaseDto): Promise<SignUpResponseDto> {
        return this.service.signup(dto)
    }

    @ApiOperation({ summary: 'Вход пользователя' })
    @Post('signin')
    @HttpCode(200)
    @ApiOkResponse({ type: SignInResponseDto })
    async signin(@Body() dto: SignInBaseDto): Promise<SignInResponseDto> {
        return this.service.signin(dto)
    }

    @ApiOperation({ summary: 'Обновление токена' })
    @Post('refresh')
    @HttpCode(200)
    @ApiOkResponse({ type: RefreshResponseDto })
    async refresh(@Body() dto: RefreshBaseDto): Promise<RefreshResponseDto> {
        return this.service.refresh(dto)
    }
}
