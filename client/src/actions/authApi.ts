import api from "./axiosConfig";

// Login User
// Public
const login = async (email: string, password: string) => {
 const body = JSON.stringify({ email, password });
 const res = await api().post(`/api/auth`, body);

 return res.data
};

export {
 login
};