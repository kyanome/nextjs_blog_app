import api from "@/utils/api";
import useSWR from "swr";

export const useAdminDataFetch = (path: string) => useSWR(path, api.getAdmin);
