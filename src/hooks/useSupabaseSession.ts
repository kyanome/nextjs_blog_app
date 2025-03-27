import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export const useSupabaseSession = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setToken(session?.access_token || null);
      setIsLoding(false);
    };

    fetcher();
  }, []);

  return { session, isLoding, token };
};
