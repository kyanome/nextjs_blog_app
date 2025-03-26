import api from "@/utils/api";
import useSWR from "swr";

export const useDataFetch = (path: string) => {
  const { data, error, isLoading, mutate } = useSWR(path, api.get);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
