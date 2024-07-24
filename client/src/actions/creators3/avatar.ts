import api from "../axiosConfig";

//Upload Creator Avatar
const uploadAvatar = (userId: string, formData: FormData) => {
  return api().put(`/api/s3/${userId}/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { uploadAvatar };