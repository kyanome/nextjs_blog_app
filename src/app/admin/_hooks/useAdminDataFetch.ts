import api from "@/utils/api";
import useSWR from "swr";

export const useAdminDataFetch = (path: string, token: string | null) =>
  useSWR([path, token], ([path, token]) => api.getAdmin(path, token));
