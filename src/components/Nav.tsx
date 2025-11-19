import React, { JSX } from "react";

export default function Nav(): JSX.Element {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center text-white font-bold">
            IJ
          </div>
          <div>
            <h1 className="text-lg font-semibold text-brand">Injaz</h1>
            <p className="text-sm text-slate-500">Exercises platform</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <a className="text-slate-600 hover:text-brand" href="#lessons">
            Lessons
          </a>
          <a className="text-slate-600 hover:text-brand" href="#features">
            Features
          </a>

          {/* Very visible login link */}
          <a
            href="/login"
            className="ml-4 px-4 py-2 rounded-md bg-orange-500 text-white text-sm font-semibold shadow hover:opacity-90"
            id="injaz-login-btn"
          >
            Sign in
          </a>
        </nav>
      </div>
    </header>
  );
}
