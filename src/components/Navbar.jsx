"use client";
import Link from "next/link";
import Logo from "./utils/Logo";
import UserDropDown from "./utils/UserDropDown";
import {authClient} from "@/lib/auth-client";

const Navbar = () => {
  const {data: session, isPending} = authClient.useSession();
  return (
    <div className="navbar px-10 py-4 bg-base-200/30 shadow sticky top-0 z-50">
      <div className="navbar-start">
        <Logo />
      </div>

      <div className="navbar-end">
        {!session?.user ? (
          <>
            {/* Not logged in */}
            <button className="btn btn-primary">
              <Link href={"/login"}>Login</Link>
            </button>
          </>
        ) : (
          // logged in
          <>
            <UserDropDown user={session?.user} />
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
