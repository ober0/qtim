import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        const accessSecret = process.env.ACCESS_SECRET
        if (!accessSecret) {
            throw new Error('ACCESS_SECRET не прописан в env')
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: accessSecret
        })
    }

    async validate(payload: any) {
        return this.userService.findOneById(payload.id)
    }
}
