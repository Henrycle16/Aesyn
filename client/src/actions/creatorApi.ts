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

// Get Creator Self *Works
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

// Creator Signup *Works
// Public
const creatorSignUp = async (body: string) => {
  return await api().post(`/api/creators`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Creator Update 
// Private
const creatorUpdate = async (body: string) => {
  return await api().post(`/api/creators`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Get all Creators
// Public
const getAllCreators = (userId: string) => {
  return api().get(`/api/creators`);
};

// Get Creator by ID *Works
// Public
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

// Delete creator
// Private
const deleteCreator = (userId: string) => {
  api().delete(`/api/creators/`, {
    params: {
      userId: userId,
    },
  });
};

export {
  getCreatorSelf,
  creatorSignUp,
  creatorUpdate,
  getCreatorByUserId,
  getCreatorByUsername,
  addPackage,
  updatePackage,
  deletePackage,
  deleteCreator
};