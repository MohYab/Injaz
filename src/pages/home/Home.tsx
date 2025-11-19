import React, { JSX } from "react";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";

function FeatureCard({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-3">
      <div className="text-3xl">{icon ?? "📚"}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-slate-600">{children}</p>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      {/* Hero */}
      <main className="flex-1">
        <section className="bg-gradient-to-r from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-extrabold text-brand leading-tight">
                Injaz — Practice exercises your students will love
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Deliver interactive exercises, track attempts, and reward
                students with a points system. Built for teachers and schools —
                easy-to-use CMS and real-time reporting.
              </p>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 rounded-md bg-brand text-white font-semibold shadow hover:opacity-95"
                >
                  Sign in
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center px-6 py-3 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  View features
                </a>
              </div>

              <div className="mt-6 text-sm text-slate-500">
                <strong>Points:</strong> +10 per correct answer, −5 per wrong
                answer. Retry allowed on failure.
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm text-slate-500">Student demo</h4>
                    <div className="text-2xl font-semibold text-brand">
                      Mohamed Saeed
                    </div>
                    <div className="text-sm text-slate-500">
                      Ring: Math - Grade 6A
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Points</div>
                    <div className="text-xl font-bold text-accent">240</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded">
                    <div className="text-xs text-slate-500">Last attempt</div>
                    <div className="text-sm font-medium">
                      Fractions — Compare
                    </div>
                    <div className="text-xs text-slate-400">
                      Score 80 (Passed)
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded">
                    <div className="text-xs text-slate-500">Next exercise</div>
                    <div className="text-sm font-medium">
                      Operations on Fractions
                    </div>
                    <Link
                      to="/login"
                      className="mt-2 inline-block px-3 py-1 rounded bg-accent text-white text-xs"
                    >
                      Start (login)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* rest of page (features, lessons, CTA) */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold text-brand mb-6">Core features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard title="Lesson Management" icon="🗂️">
              Teachers can create lessons and exercises (MCQ + True/False),
              archive content and manage students.
            </FeatureCard>
            <FeatureCard title="Exercise Runner" icon="📝">
              Students answer questions, submit attempts and see immediate
              results. Retry allowed on failed attempts.
            </FeatureCard>
            <FeatureCard title="Scoring System" icon="⭐">
              Points: +10 correct, −5 incorrect. Points are added to student's
              balance after each submission.
            </FeatureCard>
          </div>
        </section>
      </main>
    </div>
  );
}
