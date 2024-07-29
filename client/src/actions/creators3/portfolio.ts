import api from "../axiosConfig";

//Upload portfolio content image
const uploadImage = (userId: string, formData: FormData) => {
  return api().post(`/api/s3/${userId}/portfolio`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//Upload portfolio content video
const uploadVideo = (userId: string, contentData: any) => {
  return api().post(`/api/s3/${userId}/portfolio`, contentData);
};

export { uploadImage, uploadVideo };
