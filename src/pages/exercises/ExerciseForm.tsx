import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import QuestionForm from "../../components/QuestionForm";
import { Exercise, Question, Difficulty } from "../../types/exercise";
import { useLanguage } from "../../contexts/LanguageContext";

export default function ExerciseForm(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exercise, setExercise] = useState<Exercise>({
    title: "",
    description: "",
    subject: "",
    difficulty: "medium",
    questions: [],
    timeLimit: undefined,
  });

  useEffect(() => {
    if (isEditing && id) {
      const loadExercise = async () => {
        setLoading(true);
        try {
          const token =
            sessionStorage.getItem("injaz_token") ||
            localStorage.getItem("injaz_token");

          const res = await fetch(`/api/exercises/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            if (data.exercise) {
              setExercise(data.exercise);
            }
          } else if (res.status === 404) {
            setError("Exercise not found");
          } else {
            setError("Failed to load exercise");
          }
        } catch (err) {
          console.error("Error loading exercise:", err);
          setError("Failed to load exercise");
        } finally {
          setLoading(false);
        }
      };
      loadExercise();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!exercise.title.trim()) {
      setError(t("exerciseForm.enterTitleError"));
      return;
    }
    if (!exercise.subject.trim()) {
      setError(t("exerciseForm.enterSubjectError"));
      return;
    }
    if (exercise.questions.length === 0) {
      setError(t("exerciseForm.addQuestionError"));
      return;
    }

    // Validate questions
    for (let i = 0; i < exercise.questions.length; i++) {
      const q = exercise.questions[i];
      const qNum = i + 1;
      if (!q.question.trim()) {
        setError(t("exerciseForm.questionMissing").replace("{n}", qNum.toString()));
        return;
      }
      if (q.type === "multiple-choice") {
        if (!q.options || q.options.length < 2) {
          setError(t("exerciseForm.questionOptions").replace("{n}", qNum.toString()));
          return;
        }
        if (q.options.some((opt) => !opt.trim())) {
          setError(t("exerciseForm.questionEmptyOptions").replace("{n}", qNum.toString()));
          return;
        }
        if (!q.correctAnswer) {
          setError(t("exerciseForm.questionCorrectAnswer").replace("{n}", qNum.toString()));
          return;
        }
      } else if (!q.correctAnswer || (typeof q.correctAnswer === "string" && !q.correctAnswer.trim())) {
        setError(t("exerciseForm.questionCorrectAnswer").replace("{n}", qNum.toString()));
        return;
      }
      if (q.points < 1) {
        setError(t("exerciseForm.questionPoints").replace("{n}", qNum.toString()));
        return;
      }
    }

    setLoading(true);
    try {
      const token =
        sessionStorage.getItem("injaz_token") ||
        localStorage.getItem("injaz_token");

      const url = isEditing ? `/api/exercises/${id}` : "/api/exercises";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(exercise),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || (isEditing ? t("exerciseForm.failedUpdate") : t("exerciseForm.failedCreate")));
        setLoading(false);
        return;
      }

      const data = await res.json();
      navigate("/exercises", { replace: true });
    } catch (err) {
      console.error("Error saving exercise:", err);
      setError(t("auth.networkError"));
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 1,
    };
    setExercise({
      ...exercise,
      questions: [...exercise.questions, newQuestion],
    });
  };

  const updateQuestion = (index: number, question: Question) => {
    const updated = [...exercise.questions];
    updated[index] = question;
    setExercise({ ...exercise, questions: updated });
  };

  const deleteQuestion = (index: number) => {
    const updated = exercise.questions.filter((_, i) => i !== index);
    setExercise({ ...exercise, questions: updated });
  };

  if (loading && isEditing) {
    return (
      <div>
        <Nav />
        <div style={{ paddingTop: 24 }}>
          <div className="container-wide" style={{ padding: "3rem", textAlign: "center" }}>
            <div className="small-muted">{t("common.loading")}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div style={{ paddingTop: 24 }}>
        <div className="container-wide" style={{ padding: "2rem 0" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ margin: 0 }}>
              {isEditing ? t("exerciseForm.edit") : t("exerciseForm.create")}
            </h1>
            <div className="small-muted" style={{ marginTop: 6 }}>
              {isEditing
                ? t("exerciseForm.updateDetails")
                : t("exerciseForm.createNew")}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card card-lg" style={{ marginBottom: 24 }}>
              <h3 style={{ marginTop: 0, marginBottom: 16 }}>
                {t("exerciseForm.details")}
              </h3>

              <div style={{ display: "grid", gap: 16 }}>
                <div>
                  <label className="form-label">{t("exerciseForm.title")} *</label>
                  <input
                    className="form-input"
                    type="text"
                    value={exercise.title}
                    onChange={(e) =>
                      setExercise({ ...exercise, title: e.target.value })
                    }
                    placeholder={t("exerciseForm.enterTitle")}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">{t("exerciseForm.description")}</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={exercise.description}
                    onChange={(e) =>
                      setExercise({ ...exercise, description: e.target.value })
                    }
                    placeholder={t("exerciseForm.briefDescription")}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label className="form-label">{t("exerciseForm.subject")} *</label>
                    <input
                      className="form-input"
                      type="text"
                      value={exercise.subject}
                      onChange={(e) =>
                        setExercise({ ...exercise, subject: e.target.value })
                      }
                      placeholder={t("exerciseForm.subjectExample")}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">{t("exerciseForm.difficulty")} *</label>
                    <select
                      className="form-input"
                      value={exercise.difficulty}
                      onChange={(e) =>
                        setExercise({
                          ...exercise,
                          difficulty: e.target.value as Difficulty,
                        })
                      }
                      required
                    >
                      <option value="easy">{t("exercises.easy")}</option>
                      <option value="medium">{t("exercises.medium")}</option>
                      <option value="hard">{t("exercises.hard")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">{t("exerciseForm.timeLimit")}</label>
                  <input
                    className="form-input"
                    type="number"
                    min="1"
                    value={exercise.timeLimit || ""}
                    onChange={(e) =>
                      setExercise({
                        ...exercise,
                        timeLimit: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder={t("exerciseForm.noTimeLimit")}
                  />
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <h3 style={{ margin: 0 }}>{t("exerciseForm.questions")} ({exercise.questions.length})</h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="btn btn-primary"
                >
                  {t("exerciseForm.addQuestion")}
                </button>
              </div>

              {exercise.questions.length === 0 ? (
                <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>❓</div>
                  <h4>{t("exerciseForm.noQuestions")}</h4>
                  <p className="small-muted" style={{ marginTop: 8 }}>
                    {t("exerciseForm.addFirst")}
                  </p>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="btn btn-primary"
                    style={{ marginTop: 16 }}
                  >
                    {t("exerciseForm.addQuestion")}
                  </button>
                </div>
              ) : (
                exercise.questions.map((question, index) => (
                  <QuestionForm
                    key={question.id || `question-${index}`}
                    question={question}
                    onChange={(q) => updateQuestion(index, q)}
                    onDelete={() => deleteQuestion(index)}
                    index={index}
                  />
                ))
              )}
            </div>

            {error && <div className="alert alert-error" style={{ marginBottom: 16 }}>{error}</div>}

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => navigate("/exercises")}
                className="btn btn-ghost"
              >
                {t("common.cancel")}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? isEditing
                    ? t("exerciseForm.updating")
                    : t("exerciseForm.creating")
                  : isEditing
                  ? t("exerciseForm.updateExercise")
                  : t("exerciseForm.create")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

