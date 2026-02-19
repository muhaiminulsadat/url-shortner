"use client";

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
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText("shorty.com/url");
    toast.success("Link copied successfully");
  };

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
        <button className="btn btn-primary rounded-xl shadow-lg shadow-primary/20 gap-2">
          <HiOutlinePlus className="text-lg" />
          Create New Link
        </button>
      </div>

      {/* 2. Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stats shadow-sm border border-base-300 bg-base-200/30 overflow-hidden">
          <div className="stat">
            <div className="stat-figure text-primary">
              <HiOutlineLink size={32} />
            </div>
            <div className="stat-title font-bold">Links Created</div>
            <div className="stat-value text-primary">12</div>
            <div className="stat-desc">4 more than last month</div>
          </div>
        </div>

        <div className="stats shadow-sm border border-base-300 bg-base-200/30 overflow-hidden">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <HiOutlineCursorArrowRays size={32} />
            </div>
            <div className="stat-title font-bold">Total Clicks</div>
            <div className="stat-value text-secondary">1.2K</div>
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
        {/* Example of how a Link Card will look */}
        <div className="group card card-side bg-base-100 border border-base-300 hover:border-primary/30 transition-all shadow-sm">
          <div className="card-body p-5">
            <div className="flex flex-col md:flex-row justify-between gap-4">
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

              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xl font-black">142</p>
                  <p className="text-[10px] uppercase font-bold opacity-40 tracking-tighter">
                    Clicks
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-square btn-sm btn-ghost border-base-300"
                    onClick={handleCopy}
                  >
                    <HiOutlineLink />
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

        {/* Empty State (Shown when no links) */}
        {/* <div className="py-20 text-center border-2 border-dashed border-base-300 rounded-3xl">
          <p className="opacity-40">No links found. Create your first one!</p>
        </div> 
        */}
      </div>
    </div>
  );
}
