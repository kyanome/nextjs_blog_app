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

  getAdmin: async (path: string, token: string | null) => {
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

  post: async <T>(path: string, body: T, token: string | null) => {
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

  put: async <T>(path: string, body: T, token: string | null) => {
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

  delete: async (path: string, token: string | null) => {
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
