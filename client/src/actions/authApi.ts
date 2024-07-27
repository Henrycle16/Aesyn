import api from "./axiosConfig";

// Login User
// Public
const login = async (email: string, password: string) => {
  const body = JSON.stringify({ email, password });
  const res = await api().post(`/api/auth`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export {
  login
}