import api from "@/utils/api";
import useSWR from "swr";

export const useDataFetch = (path: string) => useSWR(path, api.get);
