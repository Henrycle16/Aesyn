import Link from "next/link";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

/* 5 Cols / 7 rows */

const LargeFooter = () => {
  return (
    <footer className="bg-[#0C2232] text-[#E5E7EB] px-16 pb-3 pt-8 min-h-64 flex flex-col">
      <div className="grid grid-cols-[1fr,1fr,1fr,1fr,1fr] flex-1">
        {/* Aeśyn */}
        <div>
          <h1 className="text-2xl font-light">Aeśyn</h1>
        </div>
        {/* Get in Touch */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-lg">Get in Touch</h2>
          <div className="flex items-center">
            <EmailOutlinedIcon />
            <p className="ml-2 font-extralight text-sm">company@email.com</p>
          </div>
          <div className="flex items-center">
            <PhoneOutlinedIcon />
            <p className="ml-2 font-extralight text-sm">(123) 456-7890</p>
          </div>
        </div>
        {/* Company */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-lg">Company</h2>
          <Link href="/" className="hover:underline font-extralight text-sm">
            Service
          </Link>
          <Link href="/" className="hover:underline font-extralight text-sm">
            Features
          </Link>
          <Link href="/" className="hover:underline font-extralight text-sm">
            FAQ
          </Link>
          <Link href="/" className="hover:underline font-extralight text-sm">
            Our Team
          </Link>
          <Link href="/" className="hover:underline font-extralight text-sm">
            Contact Us
          </Link>
        </div>
        {/* Legal */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-lg">Legal</h2>
          <Link href="/" className="hover:underline font-extralight text-sm">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:underline font-extralight text-sm">
            Terms &amp; Conditions
          </Link>
        </div>
        {/* Join a Newsletter */}
        <div>
          <label htmlFor="newsletter" className="font-semibold text-lg">Join a Newsletter</label>
          <input
            type="email"
            id="newsletter"
            className="text-gray-900 rounded input-md w-full mt-4"
            placeholder="Enter Your Email"
          />
          <button
            type="button"
            className="bg-[#3DA9FC] hover:bg-blue-600 font-semibold rounded px-8 mt-4 py-2.5"
          >
            Send
          </button>
        </div>
      </div>
      {/* Copyright */}
      <p className="text-xs font-extralight">
        Copy Right © 2024 All Rights Reserved by Start Up LLC
      </p>
    </footer>
  );
};

export default LargeFooter;
