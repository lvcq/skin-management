'use client'

import { useCallback, useState } from 'react';
import type {FailResponse, SuccessResponse,PaginationResponse } from '@/models/response.model';

type ErrorResult = {
  error: true
  message: string
  data?: null
}

type SuccessResult<T> = {
  error: false
  message?: string
  data: T
}

// eslint-disable-next-line no-unused-vars
export default function useAction<T extends (...args:any) => Promise<FailResponse | SuccessResponse<unknown>|PaginationResponse<unknown>>>(handler: T) {

  const [data, setData] = useState<Awaited<ReturnType<T>>['data'] | undefined>();
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const action = useCallback(async (...args: Parameters<T>): Promise<ErrorResult | SuccessResult<Awaited<ReturnType<T>>['data']>> => {
    try {
      setLoading(true);
      setError(false);
      setData(void 0);
      setMessage(void 0);

      const data = await handler(...args);

      setMessage(data?.message);
      setData(data?.data);

      if (data?.success) {
        setError(false);
        return {
          data: data.data,
          error: false,
          message: data.message,
        };
      } else {
        setError(true);
        return {
          error: true,
          message: data?.message??"",
        };
      }
    } catch (error: any) {
      setMessage(error?.message);
      setError(true);
      return {
        error: true,
        message: '服务器出现错误，请联系管理员',
      };
    } finally {
      setLoading(false);
    }
  }, [handler]);

  return {
    data,
    error,
    message,
    run: action,
    loading,
  }
}
