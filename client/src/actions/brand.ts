import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'

//Get User by ID
export const brandSignUp = async (formData: string) => {


 try {
   const res = await axios.post(`${serverUrl}/api/brands`, formData, {
     headers: {
       "Content-Type": "application/json",
     },
   });

   console.log("Brand Created: ");
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