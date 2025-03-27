import { supabase } from "@/utils/supabase";

const getAuthToken = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || null;
};

const api = {
  get: async (path: string) => {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  },

  getAdmin: async (path: string) => {
    const token = await getAuthToken();
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ?? "",
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  },

  post: async <T>(path: string, body: T) => {
    const token = await getAuthToken();
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ?? "",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response;
  },

  put: async <T>(path: string, body: T) => {
    const token = await getAuthToken();
    const response = await fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ?? "",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response;
  },

  delete: async (path: string) => {
    const token = await getAuthToken();
    const response = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ?? "",
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response;
  },
};

export default api;
