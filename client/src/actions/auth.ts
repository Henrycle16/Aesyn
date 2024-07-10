import axios from "axios";

// Login User
// Public
export const login = async (email: string, password: string) => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("http://localhost:5000/api/auth", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Login User: ");
    console.log(res.data);
    return res.data;
  } catch (err: unknown) {
    if (typeof err === "string") {
      console.log(err.toUpperCase()); // works, `e` narrowed to string
    } else if (err instanceof Error) {
      console.log(err.message); // works, `e` narrowed to Error
    } else if (err && typeof err === "object" && "message" in err) {
      console.log(err.message);
    }
  }
};