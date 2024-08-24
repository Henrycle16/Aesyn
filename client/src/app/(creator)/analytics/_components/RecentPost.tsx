import React from 'react'

const RecentPost = () => {
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
          {/* Repeat this block for each post */}
          <tr className="border-b">
            <td className="py-4">
              <div className="w-24 h-24 bg-gray-300" />
            </td>
            <td className="py-4 max-w-xs">
              <p className="line-clamp-2 overflow-hidden">
                My name is Henry Le and I am a software engineer at General Motors
              </p>
            </td>
            <td className="py-4">Jul 2, 2024</td>
            <td className="py-4">2.3k</td>
            <td className="py-4">1.6k</td>
            <td className="py-4">32.6k</td>
            <td className="py-4">45k</td>
          </tr>
          <tr className="border-b">
            <td className="py-4">
              <div className="w-24 h-24 bg-gray-300" />
            </td>
            <td className="py-4 max-w-xs">
              <p className="line-clamp-2 overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua...
              </p>
            </td>
            <td className="py-4">Jul 2, 2024</td>
            <td className="py-4">2.3k</td>
            <td className="py-4">1.6k</td>
            <td className="py-4">32.6k</td>
            <td className="py-4">45k</td>
          </tr>
          <tr className="border-b">
            <td className="py-4">
              <div className="w-24 h-24 bg-gray-300" />
            </td>
            <td className="py-4 max-w-xs">
              <p className="line-clamp-2 overflow-hidden">
                BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAHBLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH
              </p>
            </td>
            <td className="py-4">Jul 2, 2024</td>
            <td className="py-4">2.3k</td>
            <td className="py-4">1.6k</td>
            <td className="py-4">32.6k</td>
            <td className="py-4">45k</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div></div>
  )
}

export default RecentPost