import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserBaseDto } from 'src/modules/user/dto/base.dto'

export const DecodeUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user as UserBaseDto
})
