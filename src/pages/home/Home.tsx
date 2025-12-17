import React from "react";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

function Feature({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="feature">
      <div className="text-2xl mb-2">{icon ?? "📘"}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { t } = useLanguage();
  return (
    <div>
      <Nav />
      <main>
        <section className="hero">
          <div className="container-wide hero-inner">
            <div>
              <h2 className="hero-h">
                {t("home.heroTitle")}
              </h2>
              <p className="hero-sub">
                {t("home.heroSubtitle")}
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                <Link to="/signup" className="btn btn-primary">
                  {t("home.getStarted")}
                </Link>
                <a href="#features" className="btn btn-ghost">
                  {t("home.learnMore")}
                </a>
              </div>

              <div style={{ marginTop: 18 }} className="small-muted">
                {t("home.trusted")}
              </div>
            </div>

            <div>
              <div className="promo">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div className="small-muted">Student</div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "1.25rem",
                        marginTop: 6,
                      }}
                    >
                      Mohamed Saeed
                    </div>
                    <div className="small-muted" style={{ marginTop: 4 }}>
                      Math — Grade 6A
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
                    marginTop: 12,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      background: "#f8fafc",
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    <div className="small-muted">Last attempt</div>
                    <div style={{ fontWeight: 600 }}>Fractions — Compare</div>
                    <div className="small-muted" style={{ marginTop: 6 }}>
                      Score 80 (Passed)
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#f8fafc",
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    <div className="small-muted">Next exercise</div>
                    <div style={{ fontWeight: 600 }}>
                      Operations on Fractions
                    </div>
                    <Link
                      to="/login"
                      className="btn btn-primary"
                      style={{
                        marginTop: 8,
                        display: "inline-block",
                        padding: "6px 10px",
                        fontSize: "0.85rem",
                      }}
                    >
                      Start (login)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="container-wide"
          style={{ padding: "2.5rem 0" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            <Feature
              title={t("home.lessonManagement")}
              desc={t("home.lessonManagementDesc")}
              icon="🗂️"
            />
            <Feature
              title={t("home.exerciseRunner")}
              desc={t("home.exerciseRunnerDesc")}
              icon="📝"
            />
            <Feature
              title={t("home.scoringSystem")}
              desc={t("home.scoringSystemDesc")}
              icon="⭐"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
