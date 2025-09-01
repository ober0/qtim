import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { DecodeUserDto } from '../auth/dto/decode-user.dto'

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async generateAccessToken(id: string): Promise<string> {
        return this.jwtService.sign({ id })
    }

    async generateRefreshToken(id: string): Promise<string> {
        return this.jwtService.sign(
            { id },
            {
                secret: process.env.REFRESH_SECRET,
                expiresIn: '7d'
            }
        )
    }

    async verifyRefreshToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.REFRESH_SECRET
            })
        } catch {
            throw new UnauthorizedException()
        }
    }

    async verifyAccessToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.ACCESS_SECRET
            })
        } catch {
            throw new UnauthorizedException()
        }
    }
}
