import SignUpComponent from "@/components/SignUpComponent";
import Image from "next/image";

export default function SignUp() {
  return (
    <div className="flex justify-between max-lg:flex-col max-lg:items-center">
      <div>
        <SignUpComponent />
      </div>

      <Image
        src="https://dummyimage.com/720x600"
        alt="hero"
        className="object-cover object-center rounded"
        width={720}
        height={600}
      />
    </div>
  );
}
