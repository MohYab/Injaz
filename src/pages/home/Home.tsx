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
    <div className="card rounded-lg-md">
      <div className="text-3xl">{icon ?? "📚"}</div>
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-sm muted mt-1">{children}</p>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <section className="hero bg-gradient-to-r from-slate-50 to-white">
          <div className="container-max flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 py-8">
              <h2 className="text-4xl font-extrabold text-brand leading-tight">
                Injaz — Practice exercises your students will love
              </h2>
              <p className="mt-4 text-lg muted">
                Deliver interactive exercises, track attempts, and reward
                students with a points system.
              </p>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/login"
                  className="btn-accent inline-flex items-center px-6 py-3"
                >
                  Sign in
                </Link>

                <a
                  href="#features"
                  className="btn-ghost inline-flex items-center px-6 py-3"
                >
                  View features
                </a>
              </div>

              <div className="mt-6 text-sm muted">
                <strong>Points:</strong> +10 per correct answer, −5 per wrong
                answer. Retry allowed on failure.
              </div>
            </div>

            <div className="w-full lg:w-1/2 py-8">
              <div className="card card-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm muted">Student demo</h4>
                    <div className="text-2xl font-semibold text-brand">
                      Mohamed Saeed
                    </div>
                    <div className="text-sm muted">Ring: Math - Grade 6A</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs muted">Points</div>
                    <div className="text-xl font-bold text-accent">240</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded">
                    <div className="text-xs muted">Last attempt</div>
                    <div className="text-sm font-medium">
                      Fractions — Compare
                    </div>
                    <div className="text-xs text-slate-400">
                      Score 80 (Passed)
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded">
                    <div className="text-xs muted">Next exercise</div>
                    <div className="text-sm font-medium">
                      Operations on Fractions
                    </div>
                    <Link
                      to="/login"
                      className="btn-sm btn-accent mt-2 inline-block"
                    >
                      Start (login)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container-max py-12">
          <h3 className="text-2xl font-bold text-brand mb-6">Core features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard title="Lesson Management" icon="🗂️">
              Teachers can create lessons and exercises (MCQ + True/False),
              archive content and manage students.
            </FeatureCard>
            <FeatureCard title="Exercise Runner" icon="📝">
              Students answer questions, submit attempts and see immediate
              results. Retry allowed on failure.
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
