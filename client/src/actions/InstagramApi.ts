import api from "./axiosConfig";

// Get Instagram Data by Creator id
const getInstagramDataById = (creatorId: string) => {
  return api().get(`/api/instagram/creator/${creatorId}`);
};

const updateInstagramData = (businessID: string) => {
  return api().put(`/api/instagram/insights`, {businessID})
}

export { getInstagramDataById, updateInstagramData };