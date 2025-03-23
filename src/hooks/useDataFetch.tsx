"use client";
import { useEffect, useState } from "react";

export const useDataFetch = <Data,>(path: string) => {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/${path}`);
      const { data } = await res.json();
      setData(data);
      setLoading(false);
    };

    fetcher();
  }, [path]);

  return { data, loading };
};
