import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";
import { Exercise, Difficulty } from "../../types/exercise";
import { useLanguage } from "../../contexts/LanguageContext";

export default function ExerciseList(): JSX.Element {
  const { t } = useLanguage();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState<string>("");
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "">("");

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    setLoading(true);
    setError(null);
    try {
      const token =
        sessionStorage.getItem("injaz_token") ||
        localStorage.getItem("injaz_token");
      
      const res = await fetch("/api/exercises", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // If API doesn't exist yet, use mock data
        if (res.status === 404) {
          setExercises([]);
          setLoading(false);
          return;
        }
        throw new Error(`Failed to load exercises (${res.status})`);
      }

      const data = await res.json();
      setExercises(data.exercises || []);
    } catch (err) {
      console.error("Error loading exercises:", err);
      setError(t("exercises.failedLoad"));
      // Use empty array for now
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("exercises.deleteConfirm"))) return;

    try {
      const token =
        sessionStorage.getItem("injaz_token") ||
        localStorage.getItem("injaz_token");

      const res = await fetch(`/api/exercises/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setExercises(exercises.filter((ex) => ex.id !== id));
      } else {
        alert(t("exercises.failedDelete"));
      }
    } catch (err) {
      console.error("Error deleting exercise:", err);
      alert(t("exercises.failedDelete"));
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "easy":
        return "#10b981";
      case "medium":
        return "#f59e0b";
      case "hard":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const filteredExercises = exercises.filter((ex) => {
    if (filterSubject && !ex.subject.toLowerCase().includes(filterSubject.toLowerCase())) {
      return false;
    }
    if (filterDifficulty && ex.difficulty !== filterDifficulty) {
      return false;
    }
    return true;
  });

  const uniqueSubjects = Array.from(new Set(exercises.map((ex) => ex.subject)));

  return (
    <div>
      <Nav />
      <div style={{ paddingTop: 24 }}>
        <div className="container-wide" style={{ padding: "2rem 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div>
              <h1 style={{ margin: 0 }}>{t("exercises.title")}</h1>
              <div className="small-muted" style={{ marginTop: 6 }}>
                {t("exercises.createManage")}
              </div>
            </div>
            <Link to="/exercises/new" className="btn btn-primary">
              {t("exercises.createNew")}
            </Link>
          </div>

          {/* Filters */}
          <div
            className="card"
            style={{
              marginBottom: 24,
              padding: 16,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">{t("exercises.filterSubject")}</label>
              <input
                className="form-input"
                type="text"
                placeholder={t("exercises.searchSubject")}
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">{t("exercises.filterDifficulty")}</label>
              <select
                className="form-input"
                value={filterDifficulty}
                onChange={(e) =>
                  setFilterDifficulty(e.target.value as Difficulty | "")
                }
              >
                <option value="">{t("exercises.all")}</option>
                <option value="easy">{t("exercises.easy")}</option>
                <option value="medium">{t("exercises.medium")}</option>
                <option value="hard">{t("exercises.hard")}</option>
              </select>
            </div>
            {(filterSubject || filterDifficulty) && (
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setFilterSubject("");
                    setFilterDifficulty("");
                  }}
                >
                  {t("exercises.clearFilters")}
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
              <div className="small-muted">{t("exercises.loading")}</div>
            </div>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : filteredExercises.length === 0 ? (
            <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>📚</div>
              <h3>{t("exercises.noExercises")}</h3>
              <p className="small-muted" style={{ marginTop: 8 }}>
                {exercises.length === 0
                  ? t("exercises.getStarted")
                  : t("exercises.tryFilters")}
              </p>
              {exercises.length === 0 && (
                <Link
                  to="/exercises/new"
                  className="btn btn-primary"
                  style={{ marginTop: 16 }}
                >
                  {t("exercises.createFirst")}
                </Link>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 16,
              }}
            >
              {filteredExercises.map((exercise, index) => (
                <div key={exercise.id || `exercise-${index}`} className="card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, fontSize: "1.25rem" }}>
                        {exercise.title}
                      </h3>
                      <div className="small-muted" style={{ marginTop: 4 }}>
                        {exercise.subject}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: 4,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "white",
                        backgroundColor: getDifficultyColor(exercise.difficulty),
                        textTransform: "capitalize",
                      }}
                    >
                      {t(`exercises.${exercise.difficulty}`)}
                    </span>
                  </div>

                  {exercise.description && (
                    <p
                      style={{
                        margin: "8px 0",
                        fontSize: "0.9rem",
                        color: "#6b7280",
                      }}
                    >
                      {exercise.description.length > 100
                        ? `${exercise.description.substring(0, 100)}...`
                        : exercise.description}
                    </p>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: "1px solid #e5e7eb",
                    }}
                  >
                    <div className="small-muted">
                      {exercise.questions?.length || 0} {t("exercises.questions")}
                    </div>
                    {exercise.timeLimit && (
                      <>
                        <span className="small-muted">•</span>
                        <div className="small-muted">
                          {exercise.timeLimit} {t("exercises.min")}
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginTop: 12,
                    }}
                  >
                    <Link
                      to={`/exercises/${exercise.id}/edit`}
                      className="btn btn-ghost"
                      style={{ flex: 1 }}
                    >
                      {t("common.edit")}
                    </Link>
                    <button
                      onClick={() => exercise.id && handleDelete(exercise.id)}
                      className="btn btn-ghost"
                      style={{
                        flex: 1,
                        color: "#ef4444",
                      }}
                    >
                      {t("common.delete")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

