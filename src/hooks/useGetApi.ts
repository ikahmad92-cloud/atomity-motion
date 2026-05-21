import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { axiosInstance } from "@/api-client/axiosInstance";

type GetParams = Record<string, unknown>;

export function useGetApi<T = unknown>(
  endpoint: string,
  params?: GetParams,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">,
): UseQueryResult<T> {
  return useQuery<T>({
    queryKey: [endpoint, params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<T>(endpoint, { params });
      return data;
    },
    ...options,
  });
}
