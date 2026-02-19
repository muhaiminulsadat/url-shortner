"use client";
import Image from "next/image";
import Link from "next/link";
import {BiLink, BiLogOut} from "react-icons/bi";

const UserDropDown = ({user}) => {
  return (
    <div className="dropdown dropdown-end">
      {/* Trigger: Avatar */}
      <div
        tabIndex={0}
        role="button"
        className="avatar cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          {user?.user_metadata?.profile_pic ? (
            <Image
              src={user.user_metadata.profile_pic}
              alt="profile"
              height={50}
              width={50}
            />
          ) : (
            <div className="bg-neutral text-neutral-content flex items-center justify-center w-full h-full">
              <span className="text-xs font-bold">PA</span>
            </div>
          )}
        </div>
      </div>

      {/* Content: Menu */}
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-xl bg-base-200 border border-base-300 rounded-2xl w-52 mt-4 z-50 animate-in fade-in slide-in-from-top-2"
      >
        {/* Label */}
        <li className="menu-title text-base-content/50 px-4 py-2 text-xs font-bold uppercase tracking-wider">
          {user?.name || "Account"}
        </li>

        <div className="divider my-0 opacity-100" />

        {/* Dashboard Link */}
        <li>
          <Link href="/dashboard" className="flex items-center gap-3 py-3">
            <BiLink className="h-4 w-4" />
            My Links
          </Link>
        </li>

        {/* Logout Button */}
        <li>
          <button className="text-error hover:bg-error/10 flex items-center gap-3 py-3">
            <BiLogOut className="h-4 w-4" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
export default UserDropDown;
