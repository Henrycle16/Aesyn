import Image from "next/image";
import SignUpComponent from "@/components/SignUpComponent";

export default function SignUp() {
  return (
    <div className="flex justify-between px-12 max-lg:flex-col max-lg:items-center gap-2">
      <div className="max-w-xl">
        <SignUpComponent />
      </div>

      <div className="max-w-lg grid place-items-center">
        <Image
          src="https://dummyimage.com/720x600"
          alt="hero"
          className="w-full h-auto"
          width={500}
          height={425}
          priority={true}
        />
      </div>
    </div>
  );
}
