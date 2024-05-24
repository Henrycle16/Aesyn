import Link from "next/link";
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <footer className="footer footer-center p-2 bg-gray-200 text-base-content gap-y-4">
      <div className="grid grid-flow-col gap-4">
        {/* TODO: change a tags to use Link instead */}
        <a className="hover:text-gray-900">About Us</a>
        <a className="hover:text-gray-900">Contact</a>
      </div>

      <div className="grid grid-flow-col gap-5">
        <a>
          {/* Twitter */}
          <TwitterIcon />
        </a>
        <a>
          {/* Youtube */}
          <YouTubeIcon />
        </a>
        <a>
          {/* Facebook */}
          <FacebookIcon />
        </a>
      </div>

      <aside>
        <p>Copyright © 2024 - All right reserved by Start Up LLC</p>
      </aside>
    </footer>
  );
};

export default Footer;
