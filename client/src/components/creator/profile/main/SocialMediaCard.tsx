import Instagram from "@/components/ui/svgs/Instagram";
import Tiktok from "@/components/ui/svgs/Tiktok";
import Youtube from "@/components/ui/svgs/Youtube";
import Avatar from "@mui/material/Avatar";

type Props = {
  id: number;
  socialMedia: string;
  username: string;
  followers: string;
  avgPosts: number;
  component: React.ReactNode;
};

const SocialMediaCard = (props: Props) => {
  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 font-medium text-[#184465]">
        {props.component}
        <span className="text-sm font-medium text-[#184465]">
          {props.socialMedia}
        </span>
      </div>
      <div className="flex items-center justify-start border rounded-xl shadow-md py-4 px-6 h-40 mt-4 ">
        <Avatar sx={{ width: 80, height: 80 }} />
        <div className="ml-7">
          <p className="text-[#184465] text-base font-medium mb-4">@{props.username}</p>
          <div className="flex flex-row items-center space-x-16">
            <div className="flex flex-col items-start justify-start">
              <p className="text-[#184465] text-lg font-bold">
                {props.followers}
              </p>
              <p className="text-[#061119] text-sm">Followers</p>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-[#184465] text-lg font-bold">
                {props.avgPosts}
              </p>
              <p className="text-[#061119] text-sm">Avg. Posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCard;
