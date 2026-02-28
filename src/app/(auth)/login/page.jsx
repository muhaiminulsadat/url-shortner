import {Suspense} from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[80vh]">
          <span className="loading loading-spinner loading-lg" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
