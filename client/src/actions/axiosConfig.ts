import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'

const api = () => {
  return axios.create({
    baseURL: `${serverUrl}`,
  });
};

export default api;