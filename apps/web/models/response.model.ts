export interface FailResponse{
    success:false
    message: string
    data: null
}


export interface SuccessResponse<T>{
    success: true
    message?: string
    data: T
}

interface Pagination<T> {
    current: number
    pages: number
    total: number
    list: Array<T>
}

export type PaginationResponse<T>= SuccessResponse<Pagination<T>>