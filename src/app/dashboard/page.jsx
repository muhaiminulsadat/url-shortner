"use client";
import LinkCard from "@/components/LinkCard";
import {useNotLoggedIn} from "@/hooks/useAuthRedirect";
import {useState} from "react";
import toast from "react-hot-toast";
import {
  HiOutlineLink,
  HiOutlineCursorArrowRays,
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
} from "react-icons/hi2";

export default function Dashboard() {
  useNotLoggedIn();

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
          <p className="text-base-content/60 text-sm">
            Manage and track your shortened links
          </p>
        </div>
        <button className="btn btn-primary rounded-lg  gap-2">
          <HiOutlinePlus className="text-lg" />
          Create New Link
        </button>
      </div>

      {/* 2. Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stats shadow-sm border border-base-300 bg-base-200/50 overflow-hidden">
          <div className="stat">
            <div className="stat-figure text-primary">
              <HiOutlineLink size={32} />
            </div>
            <div className="stat-title font-bold">Links Created</div>
            <div className="stat-value text-primary">12</div>
            <div className="stat-desc">4 more than last month</div>
          </div>
        </div>

        <div className="stats shadow-sm border border-base-300 bg-base-200/50 overflow-hidden">
          <div className="stat">
            <div className="stat-figure text-primary">
              <HiOutlineCursorArrowRays size={32} />
            </div>
            <div className="stat-title font-bold">Total Clicks</div>
            <div className="stat-value text-primary">1.2K</div>
            <div className="stat-desc">Across all links</div>
          </div>
        </div>
      </div>

      {/* 3. Search and Filter Bar */}
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
        <button className="btn btn-ghost border-base-300 rounded-xl gap-2">
          <HiOutlineFunnel />
          Filter
        </button>
      </div>

      {/* 4. Links List Container */}
      <div className="space-y-4">
        {/* Link Card */}
        <LinkCard />

        {/* Empty State (Shown when no links) */}
        {/* <div className="py-20 text-center border-2 border-dashed border-base-300 rounded-3xl">
          <p className="opacity-40">No links found. Create your first one!</p>
        </div> 
        */}
      </div>
    </div>
  );
}
