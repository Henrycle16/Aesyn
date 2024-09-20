import React from 'react'

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import Post from './RecentPost/Post';

const RecentPost = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  const instaStore = useAppSelector(
    (state) => state.instagramDataReducerV2.value,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div> <div className="border border-gray-300 rounded-badge min-h-[35.125rem] px-10 pt-10 pb-4">
    <div className="heading1 mb-6">Recent Posts </div>

    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="text-left text-[#061119] font-semibold">
            <th className="pb-4">Post Image</th>
            <th className="pb-4">Post Caption</th>
            <th className="pb-4">Date Posted</th>
            <th className="pb-4">Reach</th>
            <th className="pb-4">Likes</th>
            <th className="pb-4">Shares</th>
            <th className="pb-4">Comments</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {isHydrated ? instaStore.recentPosts.map((post, index) => (
            <Post key={index} data={post}/>
          )) : <tr></tr>}
        </tbody>
      </table>
    </div>
  </div></div>
  )
}

export default RecentPost