import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { axiosInstance } from "@/api-client/axiosInstance";

export function usePostApi<
  TData = unknown,
  TVariables = Record<string, unknown>,
>(
  endpoint: string,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">,
): UseMutationResult<TData, unknown, TVariables> {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (body) => {
      const { data } = await axiosInstance.post<TData>(endpoint, body);
      return data;
    },
    ...options,
  });
}
