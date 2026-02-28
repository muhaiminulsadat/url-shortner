import {Check, Copy, Download, Trash} from "lucide-react";
import {deleteLink} from "@/actions/link.action";
import Image from "next/image";
import {useState} from "react";
import toast from "react-hot-toast";
import {formatDistanceToNow} from "date-fns"; // npm install date-fns

const LinkCard = ({link, onDelete}) => {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  const shortUrl = `${base_url}/${link.custom_url || link.short_url}`;
  console.log(shortUrl);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Link copied successfully");
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  const downloadQR = () => {
    const anchor = document.createElement("a");
    anchor.href = link.qr;
    anchor.download = `${link.title}_QR.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDelete = async () => {
    setDeleting(true);
    const result = await deleteLink(link._id);
    if (result.success) {
      toast.success("Link deleted");
      onDelete(); // refresh list
    } else {
      toast.error(result.message);
    }
    setDeleting(false);
  };

  return (
    <div className="group card card-side bg-base-200/50 border border-base-300 hover:border-primary/30 transition-all shadow-sm">
      <div className="card-body p-3">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-3 items-center rounded">
            {/* QR Code */}
            {link.qr && (
              <Image
                src={link.qr}
                width={100}
                height={100}
                alt="qr"
                className="border-primary border-2 rounded-xl invert"
              />
            )}

            {/* Details */}
            <div className="space-y-1">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                {link.title}
              </h3>
              <a
                href={shortUrl}
                className="text-sm text-primary font-semibold hover:underline"
              >
                {shortUrl}
              </a>
              <p className="text-sm opacity-50 truncate max-w-md">
                {link.original_url}
              </p>
              <div className="badge badge-outline badge-sm opacity-50">
                {formatDistanceToNow(new Date(link.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xl font-black">{link.clicks ?? 0}</p>
              <p className="text-[10px] uppercase font-bold opacity-40 tracking-tighter">
                Clicks
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className={`btn btn-square btn-sm btn-ghost border-primary border ${
                  copied ? "text-success border-success" : "hover:text-primary"
                }`}
                onClick={handleCopy}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>

              <button
                className="btn btn-square btn-sm btn-ghost hover:text-primary border-primary border"
                onClick={downloadQR}
                disabled={!link.qr}
              >
                <Download size={15} />
              </button>

              <button
                className="btn btn-square btn-sm btn-error btn-outline"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Trash size={15} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
