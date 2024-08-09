import { FailResponse,SuccessResponse,PaginationResponse } from "@/models/response.model"

interface PaginationResult<T>{
    list: Array<T>
    current: number
    pages: number
    total: number,
    message?: string
}

export class ResponseHelper{
    public static error(message: string): FailResponse {
        return {
          success: false,
          message,
          data:null
        };
      }
    
      public static success<T>(data: T, message?: string): SuccessResponse<T> {
        return {
          success:true,
          message,
          data,
        };
      }

      public static list<T>(result:PaginationResult<T>):PaginationResponse<T>{
        const { total,list,current,pages,message } = result;
        return {
            success: true,
            message: message,
            data:{
                total,
                list,
                pages,
                current
            } 
        }
      }
}