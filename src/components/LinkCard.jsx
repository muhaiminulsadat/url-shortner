import Image from "next/image";
import toast from "react-hot-toast";
import {BiCopy} from "react-icons/bi";
import {HiOutlineLink} from "react-icons/hi2";

const qrLink = "https://pngimg.com/uploads/qr_code/qr_code_PNG10.png";

const LinkCard = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("shorty.com/url");
    toast.success("Link copied successfully");
  };

  return (
    <div className="group card card-side bg-base-200/50 border border-base-300 hover:border-primary/30 transition-all shadow-sm">
      <div className="card-body p-3">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-3 items-center ">
            {/* qr */}

            <Image
              src={qrLink}
              width={100}
              height={100}
              alt="qr"
              className="invert"
            />

            {/* details */}
            <div className="space-y-1">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                Portfolio Link
              </h3>
              <p className="text-sm opacity-50 truncate max-w-md">
                https://very-long-original-url.com/user/sadat/portfolio-2026
              </p>
              <div className="badge badge-outline badge-sm opacity-50">
                Created 2 days ago
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xl font-black">142</p>
              <p className="text-[10px] uppercase font-bold opacity-40 tracking-tighter">
                Clicks
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-square btn-sm btn-ghost hover:text-primary border-primary border"
                onClick={handleCopy}
              >
                <BiCopy size={15} className="" />
              </button>
              <button className="btn btn-square btn-sm btn-error btn-outline">
                {/* Delete Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LinkCard;
