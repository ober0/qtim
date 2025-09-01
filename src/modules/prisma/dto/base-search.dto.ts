import { PaginationDto } from './pagination.dto'

export class SearchBaseDto<F, S> {
    filters?: F
    pagination?: PaginationDto
    query?: string
    sorts?: S
}
