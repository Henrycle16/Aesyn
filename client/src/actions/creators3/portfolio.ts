import api from "../axiosConfig";

const uploadImage = (userId: string, formData: FormData) => {
  return api().post(`/api/s3/${userId}/portfolio`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const uploadVideo = (userId: string, contentData: any) => {
  return api().post(`/api/s3/${userId}/portfolio`, contentData);
};

const deleteVideo = (userId: string, contentData: any) => {
  return api().delete(`/api/s3/${userId}/portfolio/${contentData._id}`);
};

const updateImage = (userId: string, contentId: string, formData: FormData) => {
  return api().put(`/api/s3/${userId}/portfolio/${contentId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateVideo = (userId: string, contentData: any) => {
  return api().put(`/api/s3/${userId}/portfolio/${contentData._id}`, contentData);
};


export { uploadImage, uploadVideo, deleteVideo, updateImage, updateVideo };
