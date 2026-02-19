"use client";

import {useAuthRedirect, useLoggedIn} from "@/hooks/useAuthRedirect";
import {authClient} from "@/lib/auth-client";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";

export default function RegisterPage() {
  const [formData, setformData] = useState({name: "", email: "", password: ""});
  const [loading, setLoading] = useState(false);

  useLoggedIn();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const {data, error} = authClient.signUp.email(formData, {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          setLoading(false);
          toast.success("You have registered Successfully");
          redirect("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      });
    } catch (error) {
      toast.error("First: ", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-sm border border-base-300">
        <div className="card-body gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-black text-primary tracking-tight">
              Create Account
            </h1>
            <p className="text-sm opacity-60 mt-2">
              Join Shorty and start shortening
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-control space-y-1">
              <label className="label font-bold text-s">Full Name</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-4 opacity-40" />
                <input
                  type="text"
                  value={formData.name}
                  placeholder="Sadat"
                  name="userName"
                  onChange={(e) =>
                    setformData({...formData, name: e.target.value})
                  }
                  className="input input-bordered w-full pl-11 bg-base-100"
                  required
                />
              </div>
            </div>

            <div className="form-control space-y-1">
              <label className="label font-bold text-s">Email</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-4 opacity-40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="email@example.com"
                  className="input input-bordered w-full pl-11 bg-base-100"
                  required
                  onChange={(e) =>
                    setformData({...formData, email: e.target.value})
                  }
                />
              </div>
            </div>

            <div className="form-control space-y-1">
              <label className="label font-bold text-s">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-4 opacity-40" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-11 bg-base-100"
                  required
                  onChange={(e) =>
                    setformData({...formData, password: e.target.value})
                  }
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              {loading ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm">
            Already have an account?
            <Link href="/login" className="link link-primary font-bold ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
