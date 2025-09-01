import * as bcrypt from 'bcryptjs'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class PasswordService {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }
}
