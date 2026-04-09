const BASE_URL = "http://localhost:8080"; // your Spring Boot URL

export const api = {
  get: async (path) => {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error("API error");
    return res.json();
  },

  post: async (path, body) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("API error");
    return res.json();
  },

  del: async (path) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("API error");
  },
};