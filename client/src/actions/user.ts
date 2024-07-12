import axios from "axios";

// Get all users
// Public
export const getAllUsers = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/users");

    return res.data;
  } catch (err: unknown) {
    if (typeof err === "string") {
      console.log(err.toUpperCase());
    } else if (err instanceof Error) {
      console.log(err.message);
    } else if (err && typeof err === "object" && "message" in err) {
      console.log(err.message);
    }
  }
};

// Get User by id
// Public
export const getUserById = async (id: string) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/users/${id}`);

    return res.data;
  } catch (err: unknown) {
    if (typeof err === "string") {
      console.log(err.toUpperCase());
    } else if (err instanceof Error) {
      console.log(err.message);
    } else if (err && typeof err === "object" && "message" in err) {
      console.log(err.message);
    }
  }
};

// Register User
// Public
export const registerUser = async (
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

  try {
    const res = await axios.post("http://localhost:5000/api/users", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Register User: ");
    console.log(res.data);
    return res.data;
  } catch (err: unknown) {
    if (typeof err === "string") {
      console.log(err.toUpperCase());
    } else if (err instanceof Error) {
      console.log(err.message);
    } else if (err && typeof err === "object" && "message" in err) {
      console.log(err.message);
    }
  }
};

// Update self user
// Private
export const userSelfUpdate = async () => {
  try {
    const res = await axios.put(`http://localhost:5000/api/users/`);

    return res.data;
  } catch (err: unknown) {
    if (typeof err === "string") {
      console.log(err.toUpperCase());
    } else if (err instanceof Error) {
      console.log(err.message);
    } else if (err && typeof err === "object" && "message" in err) {
      console.log(err.message);
    }
  }
};

// Delete user
// Private
export const deleteUser = async () => {
 try {
   const res = await axios.delete(`http://localhost:5000/api/users/`);

 } catch (err: unknown) {
   if (typeof err === "string") {
     console.log(err.toUpperCase());
   } else if (err instanceof Error) {
     console.log(err.message);
   } else if (err && typeof err === "object" && "message" in err) {
     console.log(err.message);
   }
 }
};