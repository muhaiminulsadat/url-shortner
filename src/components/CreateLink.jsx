"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useRef, useState} from "react";
import toast from "react-hot-toast";
import {QRCodeCanvas} from "qrcode.react";
import {authClient} from "@/lib/auth-client";
import {createLink} from "@/actions/link.action";

const CreateLink = ({onSuccess}) => {
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: "",
    customUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const qrRef = useRef();

  const router = useRouter();

  const {data: session} = authClient.useSession();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.title || !formValues.longUrl) {
      return toast.error("Please fill in required fields");
    }

    console.log("Submitting Data:", formValues);

    setFormValues({title: "", longUrl: "", customUrl: ""});
    document.getElementById("my_modal_7").close();
  };

  const createNewLink = async () => {
    setLoading(true);

    try {
      const canvas = qrRef.current;
      const qrCodeDataUrl = canvas?.toDataURL("image/png") ?? null;

      const result = await createLink({
        title: formValues.title,
        original_url: formValues.longUrl,
        custom_url: formValues.customUrl || null,
        qr: qrCodeDataUrl,
        userId: session?.user?.id ?? null,
      });

      if (!result.success) throw new Error(result.message);

      toast.success("Link created successfully!");
      onSuccess();
      setFormValues({title: "", longUrl: "", customUrl: ""});
      document.getElementById("my_modal_7").close();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <dialog id="my_modal_7" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 shadow-xl border border-base-300">
          {/* Close Button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-2xl mb-6 text-primary">
            Create New Link
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs uppercase opacity-70">
                  Link Title <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                placeholder="e.g. Portfolio"
                className="input input-bordered w-full focus:outline-primary"
                required
              />
            </div>

            {/* Long URL Input */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs uppercase opacity-70">
                  Long URL <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="url"
                name="longUrl"
                value={formValues.longUrl}
                onChange={handleChange}
                placeholder="https://very-long-link.com/..."
                className="input input-bordered w-full focus:outline-primary"
                required
              />
            </div>

            {/* QR Code Preview */}
            {formValues.longUrl && (
              <div className="flex flex-col items-center gap-2 py-4 border border-base-300 rounded-xl bg-base-200">
                <p className="text-xs font-semibold uppercase opacity-60 tracking-widest">
                  QR Preview
                </p>
                <div className="p-3 bg-white rounded-lg shadow-md">
                  <QRCodeCanvas
                    id="qr-code"
                    value={formValues.longUrl}
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    ref={qrRef}
                  />
                </div>
                <p className="text-xs opacity-50 text-center break-all px-4">
                  {formValues.longUrl}
                </p>
              </div>
            )}

            {/* Custom Link Input */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs uppercase opacity-70">
                  Custom Slug (Optional)
                </span>
              </label>
              <div className="join w-full">
                <span className="join-item bg-base-300 px-3 flex items-center text-sm opacity-70 border border-base-300">
                  shorty.com/
                </span>
                <input
                  type="text"
                  name="customUrl"
                  value={formValues.customUrl}
                  onChange={handleChange}
                  placeholder="my-link"
                  className="input input-bordered join-item w-full focus:outline-primary"
                />
              </div>
            </div>

            {/* Create Button */}
            <div className="modal-action pt-4">
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto px-10 shadow-lg"
                onClick={createNewLink}
              >
                Create Link
              </button>
            </div>
          </form>
        </div>

        {/* Click outside to close */}
        <form
          method="dialog"
          className="modal-backdrop bg-black/40 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CreateLink;
