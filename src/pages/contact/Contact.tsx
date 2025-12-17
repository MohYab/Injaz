import React, { useState } from "react";
import Nav from "../../components/Nav";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Contact(): JSX.Element {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError(t("contact.fillFields"));
      return;
    }

    if (!formData.email.includes("@")) {
      setError(t("contact.validEmail"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || t("contact.failedSend"));
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError(t("contact.networkError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div style={{ paddingTop: 24 }}>
        <div className="container-wide" style={{ padding: "3rem 0" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h1 style={{ margin: 0, fontSize: "2.5rem" }}>{t("contact.title")}</h1>
            <p className="small-muted" style={{ marginTop: 12, fontSize: "1.1rem" }}>
              {t("contact.subtitle")}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
              marginBottom: 48,
            }}
          >
            {/* Contact Information */}
            <div>
              <h2 style={{ marginTop: 0, marginBottom: 24 }}>{t("contact.getInTouch")}</h2>
              <div style={{ display: "grid", gap: 24 }}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: "var(--accent-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      📧
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Email</div>
                      <div className="small-muted">support@injaz.com</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: "var(--accent-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      📞
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Phone</div>
                      <div className="small-muted">+1 (555) 123-4567</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: "var(--accent-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      📍
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Address</div>
                      <div className="small-muted">
                        123 Education Street<br />
                        Learning City, LC 12345
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: "var(--accent-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      ⏰
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Business Hours</div>
                      <div className="small-muted">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card card-lg">
              <h2 style={{ marginTop: 0, marginBottom: 24 }}>{t("contact.sendMessage")}</h2>

              {success && (
                <div
                  className="alert"
                  style={{
                    background: "#d1fae5",
                    color: "#065f46",
                    border: "1px solid #10b981",
                    marginBottom: 16,
                  }}
                >
                  ✓ {t("contact.success")}
                </div>
              )}

              {error && (
                <div className="alert alert-error" style={{ marginBottom: 16 }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
                <div>
                  <label className="form-label">{t("contact.name")} *</label>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("auth.fullName")}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">{t("auth.email")} *</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">{t("contact.subject")}</label>
                  <select
                    className="form-input"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">{t("contact.selectSubject")}</option>
                    <option value="general">{t("contact.general")}</option>
                    <option value="support">{t("contact.support")}</option>
                    <option value="billing">{t("contact.billing")}</option>
                    <option value="feature">{t("contact.feature")}</option>
                    <option value="feedback">{t("contact.feedback")}</option>
                    <option value="other">{t("contact.other")}</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">{t("contact.message")} *</label>
                  <textarea
                    className="form-input"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.tellUs")}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: "100%" }}
                >
                  {loading ? t("contact.sending") : t("contact.send")}
                </button>
              </form>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="card" style={{ background: "#f8fafc", padding: 32 }}>
            <h3 style={{ marginTop: 0, textAlign: "center" }}>
              {t("contact.faq")}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 24,
                marginTop: 24,
              }}
            >
              <div>
                <h4 style={{ marginTop: 0, marginBottom: 8 }}>{t("contact.howStart")}</h4>
                <p className="small-muted" style={{ margin: 0 }}>
                  {t("contact.howStartAnswer")}
                </p>
              </div>
              <div>
                <h4 style={{ marginTop: 0, marginBottom: 8 }}>{t("contact.mobileApp")}</h4>
                <p className="small-muted" style={{ margin: 0 }}>
                  {t("contact.mobileAppAnswer")}
                </p>
              </div>
              <div>
                <h4 style={{ marginTop: 0, marginBottom: 8 }}>{t("contact.free")}</h4>
                <p className="small-muted" style={{ margin: 0 }}>
                  {t("contact.freeAnswer")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

