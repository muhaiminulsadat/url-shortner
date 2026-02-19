"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {
  HiOutlineArrowRight,
  HiSparkles,
  HiOutlineLink,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import {authClient} from "@/lib/auth-client";

const FAQS = [
  {
    v: "item-1",
    q: "How does the Shorty URL shortener work?",
    a: "When you enter a long URL, our system generates a shorter version. This tiny link redirects users to your original destination instantly.",
  },
  {
    v: "item-2",
    q: "Do I need an account to use the app?",
    a: "Yes. Creating an account lets you manage your links, edit destinations, and view detailed click analytics.",
  },
  {
    v: "item-3",
    q: "What analytics are available?",
    a: "Track total clicks, geographic locations of your audience, and device types (mobile vs desktop) in real-time.",
  },
];

const INFO = [
  {
    icon: <HiOutlineLink />,
    val: "10k+",
    label: "Links Created",
    col: "text-primary",
  },
  {
    icon: <HiOutlineChartBar />,
    val: "50k+",
    label: "Clicks Tracked",
    col: "text-primary",
  },
  {
    icon: <HiOutlineGlobeAlt />,
    val: "120+",
    label: "Countries",
    col: "text-primary",
  },
];

export default function LandingPage() {
  const [longUrl, setLongUrl] = useState("");
  const router = useRouter();

  const {data: session, isPending} = authClient.useSession();

  const handleShorten = (e) => {
    e.preventDefault();

    if (longUrl && !session) router.push(`/login?createNew=${longUrl}`);
    if (longUrl && session) router.push(`/dashboard?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center px-6 py-12 max-w-5xl mx-auto w-full space-y-20">
      <div className="text-center space-y-6">
        <div className="badge badge-primary badge-outline gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest">
          <HiSparkles /> Free & Unlimited
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
          Your links, <br />
          <span className="text-primary">only smarter.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base-content/60 text-lg md:text-xl">
          The complete platform to shorten, brand, and track your links. Stop
          sharing ugly URLs and start sharing data-driven links.
        </p>

        {/* 2. SHORTEN FORM */}
        <form
          onSubmit={handleShorten}
          className="flex flex-col  items-center sm:flex-row w-full max-w-2xl mx-auto gap-3 pt-4"
        >
          <input
            type="url"
            required
            className="input input-bordered input-lg flex-1  px-4 py-5 focus:outline-primary bg-base-200/50"
            placeholder="Enter your loooong URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary btn-md  gap-2 px-6 py-5 shadow-lg shadow-primary/20"
          >
            Shorten!
            <HiOutlineArrowRight />
          </button>
        </form>
      </div>

      {/* 3. STATS GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {INFO.map((stat, i) => (
          <div
            key={i}
            className="card bg-base-200/50 border border-base-300 p-8 items-center text-center hover:border-primary/50 transition-colors"
          >
            <div className={`text-4xl mb-4 ${stat.col}`}>{stat.icon}</div>
            <div className="text-4xl font-black mb-1">{stat.val}</div>
            <div className="text-xs font-bold uppercase tracking-widest opacity-40">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* 4. FAQ */}
      <div className="w-full max-w-3xl space-y-4">
        <h3 className="text-2xl font-black text-center mb-8">
          Common Questions
        </h3>
        {FAQS.map((faq) => (
          <div
            key={faq.v}
            className="collapse collapse-arrow bg-base-200/70 border border-base-300 rounded-lg"
          >
            <input type="checkbox" name="my-accordion-2" />
            <div className="collapse-title text-lg font-bold">{faq.q}</div>
            <div className="collapse-content text-base-content/70 text-sm leading-relaxed">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
