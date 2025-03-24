"use client";
import api from "@/utils/api";
import { useEffect, useState } from "react";

export const useDataFetch = <Data,>(path: string) => {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const { data } = await api.get(path);
      setData(data);
      setLoading(false);
    };

    fetcher();
  }, [path]);

  return { data, loading };
};
