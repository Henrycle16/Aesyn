import api from "./axiosConfig";

// Get all users
// Public
const getAllUsers = (userId: string) => {
  return api().get(`/api/users`);
};

// Get User by id
// Public
const getUserById = (userId: string) => {
  return api().get(`/api/users/${userId}`);
};

// Register User *Works
// Public
const registerUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  promotional: boolean,
  acceptedTerms: boolean
) => {
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    promotional,
    acceptedTerms,
  });
  return api().post(`/api/users`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// **WORK IN PROGRESS
// Update self user
// Private
const updateUserSelf = (userId: string) => {
  return api().put(`/api/users/`, {
    params: {
      userId: userId,
    },
  });
};

// Delete user
// Private
const deleteUser = (userId: string) => {
  api().delete(`/api/users/`, {
    params: {
      userId: userId,
    },
  });
};

export { getAllUsers, getUserById, registerUser, updateUserSelf, deleteUser };
