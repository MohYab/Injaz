import React from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Dashboard(): JSX.Element {
  const { t } = useLanguage();
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
    <div>
      <Nav />
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
                  {t("dashboard.welcome")}{user?.fullName ? `, ${user.fullName}` : ""}
                </h1>
                <div className="small-muted" style={{ marginTop: 6 }}>
                  {t("dashboard.overview")}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="small-muted">{t("dashboard.points")}</div>
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
                <div className="small-muted">{t("dashboard.attempts")}</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>0</div>
              </div>
              <div className="card" style={{ padding: 12 }}>
                <div className="small-muted">{t("dashboard.correct")}</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>0</div>
              </div>
              <div className="card" style={{ padding: 12 }}>
                <div className="small-muted">{t("dashboard.streak")}</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>0</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 16,
            }}
          >
            <Link to="/exercises" className="card" style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    fontSize: "2rem",
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--accent-light)",
                    borderRadius: 12,
                  }}
                >
                  📚
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{t("dashboard.exercises")}</h3>
                  <div className="small-muted" style={{ marginTop: 4 }}>
                    {t("dashboard.createManage")}
                  </div>
                </div>
              </div>
            </Link>

            <div className="card" style={{ opacity: 0.6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    fontSize: "2rem",
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f3f4f6",
                    borderRadius: 12,
                  }}
                >
                  📊
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{t("dashboard.analytics")}</h3>
                  <div className="small-muted" style={{ marginTop: 4 }}>
                    {t("dashboard.comingSoon")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
