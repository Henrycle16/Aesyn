"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [creators, setCreators] = useState<any[]>([]);

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
  const testUrl = "https://h2jc-backend.vercel.app"
  console.log(serverUrl);
  
  const getCreators = async () => {
    try {
      const results = await axios.get(
        `${testUrl}/api/creators`
      );
      console.log(results.data);
      setCreators(results.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCreators();
  }, []);

  return (
    <div>{JSON.stringify(creators[0])}</div>
  )
}

export default Page