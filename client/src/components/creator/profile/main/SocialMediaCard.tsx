import Instagram from "@/components/ui/svgs/Instagram";
import Tiktok from "@/components/ui/svgs/Tiktok";
import Youtube from "@/components/ui/svgs/Youtube";
import Avatar from "@mui/material/Avatar";

type Props = {
  id: number;
  socialMedia: string;
  username: string;
  followers: number;
  avgPosts: number;
  component: React.ReactNode;
};


const SocialMediaCard = (props: Props) => {
  return (
      <div className="row-start-1 flex items-center space-x-3 ">
        {props.component}
        <span className="text-sm font-medium text-[#184465]">
          {props.socialMedia}
        </span>
      </div>
  );
};

export default SocialMediaCard;
