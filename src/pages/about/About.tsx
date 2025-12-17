import React from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card" style={{ padding: 24, height: "100%" }}>
      <div
        style={{
          fontSize: "2.5rem",
          marginBottom: 16,
        }}
      >
        {icon}
      </div>
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>{title}</h3>
      <p className="small-muted" style={{ margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "3rem",
          fontWeight: 800,
          color: "var(--accent)",
          lineHeight: 1,
        }}
      >
        {number}
      </div>
      <div className="small-muted" style={{ marginTop: 8, fontSize: "1rem" }}>
        {label}
      </div>
    </div>
  );
}

export default function About(): JSX.Element {
  return (
    <div>
      <Nav />
      <div style={{ paddingTop: 24 }}>
        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, var(--accent-light) 0%, #f0f9ff 100%)",
            padding: "4rem 0",
            marginBottom: 48,
          }}
        >
          <div className="container-wide">
            <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "3rem",
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                About Injaz
              </h1>
              <p
                style={{
                  fontSize: "1.25rem",
                  color: "#4b5563",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Empowering educators and inspiring learners through innovative
                exercise platforms that make learning engaging, interactive, and
                rewarding.
              </p>
            </div>
          </div>
        </section>

        <div className="container-wide" style={{ padding: "2rem 0" }}>
          {/* Our Story */}
          <section style={{ marginBottom: 64 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 48,
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: "2rem" }}>
                  Our Story
                </h2>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#4b5563" }}>
                  Injaz was born from a simple observation: traditional exercise
                  platforms were often dull and disconnected from the learning
                  experience. We set out to change that.
                </p>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#4b5563" }}>
                  Founded by educators and technologists who shared a passion for
                  making learning more engaging, Injaz combines the best of
                  educational theory with modern technology to create an
                  experience that both teachers and students love.
                </p>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#4b5563" }}>
                  Today, we're proud to serve thousands of educators and students
                  worldwide, helping them achieve better learning outcomes through
                  interactive, gamified exercises.
                </p>
              </div>
              <div
                className="card"
                style={{
                  padding: 32,
                  background: "#f8fafc",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "5rem", marginBottom: 16 }}>🎓</div>
                <h3 style={{ marginTop: 0 }}>Our Vision</h3>
                <p className="small-muted">
                  To become the leading platform for interactive learning
                  exercises, making education more accessible, engaging, and
                  effective for everyone.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Values */}
          <section style={{ marginBottom: 64 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: "2rem" }}>
                Our Mission & Values
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#6b7280",
                  maxWidth: 600,
                  margin: "0 auto",
                }}
              >
                We're committed to transforming education through innovation,
                accessibility, and a deep understanding of what makes learning
                effective.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              <ValueCard
                icon="🚀"
                title="Innovation"
                description="We continuously explore new technologies and methodologies to improve the learning experience and stay ahead of educational trends."
              />
              <ValueCard
                icon="👥"
                title="Accessibility"
                description="Education should be available to everyone. We design our platform to be intuitive, affordable, and accessible to educators and students worldwide."
              />
              <ValueCard
                icon="🎯"
                title="Excellence"
                description="We strive for excellence in everything we do, from the quality of our platform to the support we provide to our users."
              />
              <ValueCard
                icon="💡"
                title="Empowerment"
                description="We empower educators to create engaging content and students to take control of their learning journey through interactive exercises."
              />
              <ValueCard
                icon="🤝"
                title="Collaboration"
                description="We believe in the power of collaboration between teachers, students, and technology to achieve the best learning outcomes."
              />
              <ValueCard
                icon="📈"
                title="Growth"
                description="We're committed to continuous improvement, listening to feedback, and evolving our platform to meet the changing needs of education."
              />
            </div>
          </section>

          {/* What We Do */}
          <section style={{ marginBottom: 64 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: "2rem" }}>
                What We Do
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#6b7280",
                  maxWidth: 600,
                  margin: "0 auto",
                }}
              >
                Injaz provides a comprehensive platform for creating, managing,
                and tracking interactive exercises that make learning fun and
                effective.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>📚</div>
                <h3 style={{ marginTop: 0 }}>Exercise Creation</h3>
                <p className="small-muted">
                  Create engaging exercises with multiple question types including
                  multiple choice, true/false, fill-in-the-blank, and short
                  answer questions.
                </p>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>📊</div>
                <h3 style={{ marginTop: 0 }}>Progress Tracking</h3>
                <p className="small-muted">
                  Monitor student progress with detailed analytics, track
                  performance over time, and identify areas that need
                  improvement.
                </p>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>⭐</div>
                <h3 style={{ marginTop: 0 }}>Gamification</h3>
                <p className="small-muted">
                  Keep students motivated with points, badges, streaks, and
                  leaderboards that make learning feel like a game.
                </p>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>👨‍🏫</div>
                <h3 style={{ marginTop: 0 }}>Teacher Tools</h3>
                <p className="small-muted">
                  Powerful tools for educators to manage classes, assign
                  exercises, and get insights into student performance.
                </p>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🔒</div>
                <h3 style={{ marginTop: 0 }}>Secure & Reliable</h3>
                <p className="small-muted">
                  Your data is safe with us. We use industry-standard security
                  practices to protect student and teacher information.
                </p>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🌐</div>
                <h3 style={{ marginTop: 0 }}>Accessible Anywhere</h3>
                <p className="small-muted">
                  Access Injaz from any device with an internet connection.
                  Works seamlessly on desktop, tablet, and mobile browsers.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section
            className="card card-lg"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, #0284c7 100%)",
              color: "white",
              marginBottom: 64,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ marginTop: 0, marginBottom: 8, color: "white" }}>
                Injaz by the Numbers
              </h2>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
                Growing every day to serve educators and students worldwide
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 32,
              }}
            >
              <StatCard number="10K+" label="Active Users" />
              <StatCard number="50K+" label="Exercises Created" />
              <StatCard number="1M+" label="Questions Answered" />
              <StatCard number="500+" label="Schools" />
            </div>
          </section>

          {/* Team Section (Placeholder) */}
          <section style={{ marginBottom: 64 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: "2rem" }}>
                Our Team
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#6b7280",
                  maxWidth: 600,
                  margin: "0 auto",
                }}
              >
                A passionate group of educators, developers, and designers
                working together to revolutionize learning.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 24,
              }}
            >
              <div className="card" style={{ padding: 24, textAlign: "center" }}>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "var(--accent-light)",
                    margin: "0 auto 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                  }}
                >
                  👨‍💼
                </div>
                <h3 style={{ marginTop: 0, marginBottom: 8 }}>Leadership Team</h3>
                <p className="small-muted" style={{ margin: 0 }}>
                  Experienced educators and tech leaders driving innovation in
                  educational technology.
                </p>
              </div>

              <div className="card" style={{ padding: 24, textAlign: "center" }}>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "var(--accent-light)",
                    margin: "0 auto 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                  }}
                >
                  👩‍💻
                </div>
                <h3 style={{ marginTop: 0, marginBottom: 8 }}>Development Team</h3>
                <p className="small-muted" style={{ margin: 0 }}>
                  Talented developers building robust, scalable solutions for
                  the education sector.
                </p>
              </div>

              <div className="card" style={{ padding: 24, textAlign: "center" }}>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "var(--accent-light)",
                    margin: "0 auto 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                  }}
                >
                  🎨
                </div>
                <h3 style={{ marginTop: 0, marginBottom: 8 }}>Design Team</h3>
                <p className="small-muted" style={{ margin: 0 }}>
                  Creative designers crafting beautiful, intuitive user
                  experiences that make learning enjoyable.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section
            className="card card-lg"
            style={{
              background: "#f8fafc",
              textAlign: "center",
              padding: 48,
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 16 }}>Join Us on This Journey</h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#6b7280",
                maxWidth: 600,
                margin: "0 auto 32px",
              }}
            >
              Whether you're an educator looking to engage your students or a
              student ready to take your learning to the next level, we're here
              to help you succeed.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/signup" className="btn btn-primary">
                Get Started Free
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

