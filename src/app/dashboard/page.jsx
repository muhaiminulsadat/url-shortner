"use client";
import CreateLink from "@/components/CreateLink";
import LinkCard from "@/components/LinkCard";
import {useNotLoggedIn} from "@/hooks/useAuthRedirect";
import {getLinks} from "@/actions/link.action";
import {authClient} from "@/lib/auth-client";
import {Filter} from "lucide-react";
import {useState, useEffect} from "react";
import {
  HiOutlineLink,
  HiOutlineCursorArrowRays,
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

export default function Dashboard() {
  useNotLoggedIn();

  const {data: session} = authClient.useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    const result = await getLinks(session.user.id);
    if (result.success) setLinks(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, [session?.user?.id]);

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.original_url.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
          <p className="text-base-content/60 text-sm">
            Manage and track your shortened links
          </p>
        </div>
        <button
          className="btn btn-primary rounded-lg gap-2"
          onClick={() => document.getElementById("my_modal_7").showModal()}
        >
          <HiOutlinePlus className="text-lg" />
          Create New Link
        </button>
        {/* Pass fetchLinks so the card list refreshes after creating a new link */}
        <CreateLink onSuccess={fetchLinks} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stats shadow-sm border border-base-300 bg-base-200/50 overflow-hidden">
          <div className="stat">
            <div className="stat-figure text-primary">
              <HiOutlineLink size={32} />
            </div>
            <div className="stat-title font-bold">Links Created</div>
            <div className="stat-value text-primary">{links.length}</div>
          </div>
        </div>
        <div className="stats shadow-sm border border-base-300 bg-base-200/50 overflow-hidden">
          <div className="stat">
            <div className="stat-figure text-primary">
              <HiOutlineCursorArrowRays size={32} />
            </div>
            <div className="stat-title font-bold">Total Clicks</div>
            <div className="stat-value text-primary">
              {links.reduce((acc, l) => acc + (l.clicks ?? 0), 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-4 flex items-center opacity-40">
            <HiOutlineMagnifyingGlass />
          </span>
          <input
            type="text"
            placeholder="Search your links..."
            className="input input-bordered w-full pl-10 rounded-xl focus:outline-primary bg-base-200/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-base-300 rounded-3xl">
            <p className="opacity-40">No links found. Create your first one!</p>
          </div>
        ) : (
          filteredLinks.map((link) => (
            <LinkCard key={link._id} link={link} onDelete={fetchLinks} />
          ))
        )}
      </div>
    </div>
  );
}
