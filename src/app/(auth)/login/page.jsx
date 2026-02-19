"use client";

import {useAuthRedirect, useLoggedIn} from "@/hooks/useAuthRedirect";
import {authClient} from "@/lib/auth-client";
import Link from "next/link";
import {redirect, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineMailOpen,
} from "react-icons/hi";

export default function LoginPage() {
  const [formData, setformData] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();
  const longLink = useSearchParams().get("createNew");

  useEffect(() => {
    if (!isPending && session) {
      const target = longLink
        ? `/dashboard?createNew=${encodeURIComponent(longLink)}`
        : "/dashboard";
      router.push(target);
    }
  }, [session, isPending, longLink, router]);

  const handleChange = (e) => {
    setformData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {data} = authClient.signIn.email(formData, {
      onRequest: (ctx) => {
        setLoading(true);
      },
      onSuccess: (ctx) => {
        setLoading(false);
        toast.success("Welcome! You are logged in successfully.");
        router.push(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      },
      onError: (ctx) => {
        setLoading(false);
        toast.error(ctx.error.message);
      },
    });
  };
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="card w-full max-w-md bg-base-200/50 shadow-sm border border-base-300">
        <div className="card-body gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight">Welcome Back</h1>
            <p className="text-sm opacity-60 mt-2">
              Login to manage your links
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control space-y-1">
              <label className="label font-bold text-s ">Email:</label>
              <div className="relative">
                <HiOutlineMailOpen className="absolute left-4 top-4 opacity-40" />
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  className="input input-bordered w-full pl-11 bg-base-100"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-control space-y-1">
              <label className="label font-bold text-s">Password:</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-4 opacity-40" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-11 bg-base-100"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              {loading ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="divider text-xs opacity-40 uppercase font-bold">
            OR
          </div>

          <p className="text-center text-sm">
            Don&rsquo;t have an account?
            <Link href="/register" className="link link-primary font-bold ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
