import Link from "next/link";
import {HiOutlineLink} from "react-icons/hi2";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5 group transition-all">
      {/* Daisy UI Masked Icon */}
      <div className="mask mask-squircle bg-primary p-2 transition-transform group-hover:rotate-12">
        <HiOutlineLink className="text-white text-xl" />
      </div>

      {/* Typography with Gradient Feature */}
      <span className="text-2xl font-black tracking-tight flex items-baseline">
        <span className="bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
          shorty
        </span>
        {/* Daisy UI Primary Indicator */}
        <span className="text-primary text-3xl leading-[0] select-none">.</span>
      </span>
    </Link>
  );
};
export default Logo;
