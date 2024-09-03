import Link from "next/link";

const LandingFooter = () => {
  return (
    <footer className="pt-8 min-h-56 flex flex-col mx-10">
      <span className="bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] p-[1px]"></span>
      <div className="flex flex-col justify-between pt-8 pb-2 flex-grow">
        <h1 className="text-xl">ShareFluence</h1>
        <div className="flex flex-col justify-between flex-grow">
          <div className="flex flex-row items-center gap-2 mt-5">
            <div className="text-[#DFDFDF] bg-[#DFDFDF] rounded-full px-[20px] py-[10px]">
              .
            </div>
            <div className="text-[#DFDFDF] bg-[#DFDFDF] rounded-full px-[20px] py-[10px]">
              .
            </div>
            <div className="text-[#DFDFDF] bg-[#DFDFDF] rounded-full px-[20px] py-[10px]">
              .
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <p>Copy Right © 2024 All Rights Reserved by ShareFluence LLC</p>
            <div className="space-x-4">
              <Link href="/">Terms and Conditions</Link>
              <Link href="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
