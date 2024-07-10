import api from "./axiosConfig";
import { getServerSession } from "next-auth";
import { config } from '@../../../auth'

type Package = {
  socialMedia: string;
  type: string;
  description: string;
  price: number;
  quantity: number;
};

// Get Creator Self
// Private
const getCreatorSelf = async (user: string) => {
  const session = await getServerSession(config);

  if (session?.user.token) {
    return api().get(`/api/creators/me`, {
      params: {
        userId: user,
      },
    });
  } else {
   // Error, not authenticated
  }
  
};

//! Might need to delete this function and use getCreatorByUserId instead
const getCreatorByUserId = (userId: string) => {
  return api().get(`/api/creators/user/${userId}`);
};

const getCreatorByUsername = (username: string) => {
  return api().get(`/api/creators/username/${username}`);
};

const addPackage = (userId: string, packageData: Package) => {
  return api().post(`/api/creators/${userId}/packages`, packageData);
};

const updatePackage = (userId: string, packageData: Package) => {
  return api().put(`/api/creators/${userId}/packages`, packageData);
};

const deletePackage = (userId: string, packageId: string) => {
  return api().delete(`/api/creators/${userId}/packages/${packageId}`);
};

export {
  getCreatorSelf,
  getCreatorByUserId,
  getCreatorByUsername,
  addPackage,
  updatePackage,
  deletePackage,
};
