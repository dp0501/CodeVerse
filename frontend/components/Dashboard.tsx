import React from "react";
import Link from "next/link";
import {
  Brain,
  BookOpen,
  Code2,
  MonitorSmartphone,
  Sparkles,
  Trophy,
  PlayCircle,
  ChevronRight,
} from "lucide-react";

// High-polish dashboard shell for coders
export default function Dashboard() {
  return (
    <div className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-20 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-10 sm:px-10">
        {/* Navbar */}
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 bg-gradient-to-r from-white/5 via-white/0 to-white/5 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-emerald-300">CodeSphere</div>
              <div className="text-xs text-neutral-400">Sharpen daily. Ship boldly.</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-300 md:flex">
            <Link className="hover:text-white" href="/practice">
              Practice
            </Link>
            <Link className="hover:text-white" href="/problems">
              Problems
            </Link>
            <Link className="hover:text-white" href="/courses">
              Courses
            </Link>
            <Link className="hover:text-white" href="/quizzes">
              Quizzes
            </Link>
            <Link className="hover:text-white" href="/profile">
              My Profile
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-emerald-400/60 hover:text-white md:inline-flex">
              Daily Streak
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition hover:from-emerald-400 hover:to-green-400">
              <PlayCircle className="h-4 w-4" />
              Quick Start
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-900/60 to-neutral-950 p-8 shadow-2xl shadow-emerald-500/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.18)_0,_transparent_40%)]" />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                <Sparkles className="h-4 w-4" /> Elite coder cockpit
              </div>
              <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Build muscle memory with curated drills, live playgrounds, and battle-tested roadmaps.
              </h1>
              <p className="max-w-2xl text-base text-neutral-300">
                Designed for makers who ship. Train on adaptive problem sets, watch your streaks glow, and jump back into unfinished labs with zero friction.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition hover:from-emerald-400 hover:to-green-400">
                  Start practicing
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/50 hover:text-emerald-100">
                  Explore tracks
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <FeatureCard
                  icon={<Brain className="h-5 w-5" />}
                  title="Adaptive drills"
                  desc="Daily sprints tuned to your speed so you never plateau."
                />
                <FeatureCard
                  icon={<Trophy className="h-5 w-5" />}
                  title="Ranked ladders"
                  desc="Climb with friends, unlock badges, and keep your streak alive."
                />
              </div>
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/70 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(56,189,248,0.18)_0,_transparent_35%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-6">
              <div className="rounded-2xl border border-cyan-400/30 bg-black/60 p-5 shadow-inner shadow-cyan-500/30">
                <MonitorSmartphone className="h-6 w-6 text-cyan-300" />
                <div className="mt-4 space-y-2 text-sm text-neutral-300">
                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                    <div className="flex items-center gap-2 text-emerald-200">
                      <Code2 className="h-4 w-4" />
                      Live Compiler
                    </div>
                    <span className="text-xs text-white/70">Ready</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                    <div className="flex items-center gap-2 text-cyan-200">
                      <BookOpen className="h-4 w-4" />
                      Current Track
                    </div>
                    <span className="text-xs text-white/70">System Design</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                    <div className="flex items-center gap-2 text-amber-200">
                      <Brain className="h-4 w-4" />
                      Focus Mode
                    </div>
                    <span className="text-xs text-white/70">On</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Stat label="Streak" value="21" accent="emerald" />
                <Stat label="Solved" value="384" accent="cyan" />
                <Stat label="Rating" value="1820" accent="amber" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-amber-400/15 p-5 text-sm text-neutral-200 shadow-lg shadow-emerald-500/15">
                Nightly sync is on. Your practice queue and drafts will follow you across devices.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-200">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <p className="text-xs text-neutral-400">{desc}</p>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: "emerald" | "cyan" | "amber" }) {
  const accents: Record<typeof accent, string> = {
    emerald: "from-emerald-500/40 to-emerald-400/20 text-emerald-50 border-emerald-500/40",
    cyan: "from-cyan-500/40 to-cyan-400/20 text-cyan-50 border-cyan-500/40",
    amber: "from-amber-400/50 to-amber-300/20 text-amber-50 border-amber-400/40",
  } as const;

  const scheme = accents[accent];

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-4 shadow-lg shadow-black/30 ${scheme}`}>
      <div className="text-xs uppercase tracking-wide text-white/70">{label}</div>
      <div className="text-2xl font-black leading-tight">{value}</div>
    </div>
  );
}
