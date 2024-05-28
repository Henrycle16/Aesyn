import Link from "next/link";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

const LargeFooter = () => {
  return (
    <footer className="bg-[#0C2232]">
      <div className="mx-auto text-[#E5E7EB] w-full max-w-screen-2xl p-4 py-5 lg:py-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 text-center md:text-left">
            <span className="text-2xl font-semibold whitespace-nowrap ">
              ShareFluence
            </span>
          </div>
          <div className="grid grid-cols-12 sm:grid-cols-12">
            <div className="col-start-3 col-span-2">
              <h2 className="mb-6 text-base font-semibold">Get in Touch</h2>
              <ul className="font-small text-xs">
                <li className="mb-4">
                  <div className="flex">
                    <EmailOutlinedIcon />
                    <p className="ml-2">company@email.com</p>
                  </div>
                </li>
                <li>
                  <div className="flex">
                    <PhoneOutlinedIcon />
                    <p className="ml-2">(123) 456-7890</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-start-5">
              <h2 className="mb-6 text-base font-semibold">Company</h2>
              <ul className="font-small text-xs">
                <li className="mb-4">
                  <Link href="/" className="hover:underline ">
                    Service
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline ">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline ">
                    FAQ
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline ">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline ">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-start-7">
              <h2 className="mb-4 text-base font-semibold">Legal</h2>
              <ul className="font-small text-xs">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-start-11 col-span-2">
              <form>
                <label
                  id="newsletter"
                  className="block mb-2 text-base font-semibold"
                >
                  Join Our Newsletter
                </label>
                <input
                  type="text"
                  id="newsletter"
                  className="text-gray-900 text-xs rounded block w-full p-2.5"
                  placeholder="Enter Your Email"
                />
                <button
                  type="submit"
                  className="text-white bg-[#3DA9FC] hover:bg-blue-600 font-medium rounded text-xs w-auto px-5 mt-3 py-2.5 text-center"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-1 text-center md:text-left">
          <span className="text-xs">
            © 2024 All Rights Reserved by Start Up LLC
          </span>
        </div>
      </div>
    </footer>
  );
};

export default LargeFooter;
