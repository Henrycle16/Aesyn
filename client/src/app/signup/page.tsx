import Image from "next/image";
import SignUpComponent from "./_components/InitialSignup";

export default function SignUp() {
  return (
    <div className="flex justify-between px-12 max-lg:flex-col max-lg:items-center gap-2">
      <div className="max-w-xl">
        <SignUpComponent />
      </div>

      <div className="max-w-lg grid place-items-center">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
          className="object-cover object-center rounded"
          width="720"
          height="600"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
