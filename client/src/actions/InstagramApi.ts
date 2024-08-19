import api from "./axiosConfig";

// Get Instagram Data by Creator id
const getInstagramDataById = (creatorId: string) => {
  return api().get(`/api/instagram/creator/${creatorId}`);
};

export { getInstagramDataById };