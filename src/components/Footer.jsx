import {HiOutlineLink} from "react-icons/hi2";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center mt-16 p-10 bg-base-200/50 text-base-content rounded-t-3xl">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/dashboard" className="link link-hover">
          Dashboard
        </Link>
        <Link href="/auth" className="link link-hover">
          Login
        </Link>
        <Link href="#" className="link link-hover">
          Privacy Policy
        </Link>
        <Link href="#" className="link link-hover">
          Contact
        </Link>
      </nav>

      <aside className="space-y-2">
        <div className="flex items-center justify-center gap-2 opacity-80">
          <div className="bg-primary p-1 rounded-md">
            <HiOutlineLink className="text-white text-lg" />
          </div>
          <span className="font-black text-xl tracking-tighter">
            shorty<span className="text-primary">.</span>
          </span>
        </div>
        <p className="text-sm opacity-50">
          Copyright © {currentYear} - All rights reserved by Sadat
        </p>
      </aside>
    </footer>
  );
}
