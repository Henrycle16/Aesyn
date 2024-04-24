import { Suspense } from "react";
import Loading from "./loading";
import SignUpComponent from "@/components/SignUpComponent";

export default function SignUp() {
    return (
     <main>
        <Suspense fallback={<Loading/>}>
            <SignUpComponent/>
        </Suspense>
     </main>
    );
}