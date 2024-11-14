import Link from "next/link";

export default function JoinedWaitlistModal() {
  const gradientButtonStyle =
    "bg-gradient-to-r from-[#5B58EB] via-[#BB63FF] to-[#5B58EB] rounded-3xl h-[2.8125rem] py-2 px-5 text-sm font-bold";
  
  return (
    <div
      className="w-[32.063rem] h-[17.125rem] flex flex-col text-white border border-[#D7D7D7] rounded-[0.9375rem] px-14 py-6 bg-gradient-to-br from-[#ffffff4d] to-[#ffffff26] from-0% to-100%"
    >
      <h1 className="font-semibold text-2xl self-center mt-5">You&apos;re in!</h1>
      <p className="text-sm mt-8 leading-6">
        Thank you for joining Aesyn&apos;s waitlist! Stay tuned
        for our new and exciting platform, we&apos;ll be in touch soon!
      </p>

      <Link 
        href="/"
        className={`${gradientButtonStyle} w-full mt-auto flex items-center justify-center [background-size:200%_100%] [transition:background_0.15s_ease-in-out] hover:[background-position:100%_center]`}
      >
        <span>Back to Home</span>
      </Link> 
    </div>
  )
}