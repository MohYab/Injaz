import React, { JSX } from "react";

export default function Dashboard(): JSX.Element {
  const stored =
    typeof window !== "undefined"
      ? sessionStorage.getItem("injaz_user") ||
        localStorage.getItem("injaz_user")
      : null;
  const user = stored ? JSON.parse(stored) : null;

  return (
    <div className="app-container">
      <div className="container-max py-12">
        <div className="card card-lg">
          <h1 className="text-2xl font-bold text-brand">Dashboard</h1>
          <p className="mt-2 text-muted">
            Welcome{user?.fullName ? `, ${user.fullName}` : ""}! This is your
            dashboard.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded">
              <h3 className="font-semibold">Quick stats</h3>
              <p className="text-sm text-muted">
                Points, attempts and recent activity will appear here.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <h3 className="font-semibold">Recent attempts</h3>
              <p className="text-sm text-muted">
                No attempts yet — start practicing!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
