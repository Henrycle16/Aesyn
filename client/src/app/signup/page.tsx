import SignUpComponent from "@/components/signup"; 
import { Suspense } from "react";
import Loading from "./loading";

export default function SignUp() {
    return (
     <main>
        <Suspense fallback={<Loading/>}>
        <SignUpComponent/>
        </Suspense>
     </main>
    );
}