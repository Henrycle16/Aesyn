import api from './axiosConfig';

type Package = {
  socialMedia: string;
  type: string;
  description: string;
  price: number;
  quantity: number;
};

const getCreatorByUserId = (userId: string) => {
  return api().get(`/api/creators/user/${userId}`);
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
  addPackage,
  updatePackage,
  deletePackage
}