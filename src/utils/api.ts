const api = {
  get: async (path: string) => {
    const response = await fetch(`/api/${path}`);
    const result = await response.json();
    return result;
  },

  post: async <T>(path: string, body: T) => {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  },

  put: async <T>(path: string, body: T) => {
    const response = await fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  },

  delete: async (path: string) => {
    const response = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};

export default api;
