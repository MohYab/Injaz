import React from "react";

export default function Dashboard(): JSX.Element {
  const stored =
    typeof window !== "undefined"
      ? sessionStorage.getItem("injaz_user") ||
        localStorage.getItem("injaz_user")
      : null;
  let user = null;
  if (stored) {
    try {
      user = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse user data:", e);
    }
  }

  return (
    <div style={{ paddingTop: 24 }}>
      <div className="container-wide" style={{ padding: "2rem 0" }}>
        <div className="card card-lg">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1 style={{ margin: 0 }}>
                Welcome{user?.fullName ? `, ${user.fullName}` : ""}
              </h1>
              <div className="small-muted" style={{ marginTop: 6 }}>
                Overview of your activity
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="small-muted">Points</div>
              <div
                style={{
                  color: "var(--accent)",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                }}
              >
                240
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            <div className="card" style={{ padding: 12 }}>
              <div className="small-muted">Attempts</div>
              <div style={{ fontWeight: 800, marginTop: 6 }}>0</div>
            </div>
            <div className="card" style={{ padding: 12 }}>
              <div className="small-muted">Correct</div>
              <div style={{ fontWeight: 800, marginTop: 6 }}>0</div>
            </div>
            <div className="card" style={{ padding: 12 }}>
              <div className="small-muted">Streak</div>
              <div style={{ fontWeight: 800, marginTop: 6 }}>0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
