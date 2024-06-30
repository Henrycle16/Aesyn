import api from './axiosConfig';

type Package = {
  socialMedia: string;
  type: string;
  description: string;
  price: number;
  quantity: number;
};

//! Might need to delete this function and use getCreatorByUserId instead
const getCreatorByUserId = (userId: string) => {
  return api().get(`/api/creators/user/${userId}`);
}


const getCreatorByUsername = (username: string) => {
  return api().get(`/api/creators/user/${username}`);
}

const addPackage = (userId: string, packageData: Package) => {
  return api().post(`/api/creators/${userId}/packages`, packageData);
}

const updatePackage = (userId: string, packageData: Package) => {
  return api().put(`/api/creators/${userId}/packages`, packageData);
}

const deletePackage = (userId: string, packageId: string) => {
  return api().delete(`/api/creators/${userId}/packages/${packageId}`);
}

export {
  getCreatorByUserId,
  getCreatorByUsername,
  addPackage,
  updatePackage,
  deletePackage
}