import axios from "axios";

const api = (url = "http://localhost:5000") => {
  return axios.create({
    baseURL: url,
  });
};

export default api;