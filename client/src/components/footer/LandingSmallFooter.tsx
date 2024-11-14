import Link from "next/link";

const LandingSmallFooter = () => {
  return (
    <footer className="py-4 flex mx-10 justify-between text-xs text-white">
      <p>Copy Right © 2024 All Rights Reserved by Aesyn LLC</p>
      <div className="space-x-4">
        <Link href="/">Terms and Conditions</Link>
        <Link href="/">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default LandingSmallFooter;