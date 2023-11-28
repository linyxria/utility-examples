import {
  DefaultError,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  UndefinedInitialDataOptions,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import request from '~/utils/request'

type QueryKey = [string]
type OmitOptions = 'queryKey' | 'queryFn'
type UseJsonOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, QueryKey>, OmitOptions>
type UseJsonOptionsWithUndefinedInitialData<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData
> = Omit<
  UndefinedInitialDataOptions<TQueryFnData, TError, TData, QueryKey>,
  OmitOptions
>
type UseJsonOptionsWithDefinedInitialData<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData
> = Omit<
  DefinedInitialDataOptions<TQueryFnData, TError, TData, QueryKey>,
  OmitOptions
>

interface UseJson {
  <TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData>(
    path: string,
    options?: UseJsonOptionsWithUndefinedInitialData<
      TQueryFnData,
      TError,
      TData
    >
  ): UseQueryResult<TData, TError>
  <TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData>(
    path: string,
    options?: UseJsonOptionsWithDefinedInitialData<TQueryFnData, TError, TData>
  ): DefinedUseQueryResult<TData, TError>
  <TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData>(
    path: string,
    options?: UseJsonOptions<TQueryFnData, TError, TData>
  ): UseQueryResult<TData, TError>
}

// @ts-ignore
export const useJson: UseJson = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData
>(
  path: string,
  options?:
    | UseJsonOptionsWithUndefinedInitialData<TQueryFnData, TError, TData>
    | UseJsonOptionsWithDefinedInitialData<TQueryFnData, TError, TData>
    | UseJsonOptions<TQueryFnData, TError, TData>
) => {
  const url = `/json/${path}`
  return useQuery<TQueryFnData, TError, TData, QueryKey>({
    queryKey: [url],
    queryFn: () => request<TQueryFnData>(url),
    ...options,
  })
}
