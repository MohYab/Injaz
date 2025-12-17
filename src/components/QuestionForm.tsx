import React, { useState, useEffect } from "react";
import { Question, QuestionType } from "../types/exercise";
import { useLanguage } from "../contexts/LanguageContext";

interface QuestionFormProps {
  question: Question;
  onChange: (question: Question) => void;
  onDelete: () => void;
  index: number;
}

export default function QuestionForm({
  question,
  onChange,
  onDelete,
  index,
}: QuestionFormProps): JSX.Element {
  const { t } = useLanguage();
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  // Sync local state when question prop changes (e.g., when loading exercise for editing)
  useEffect(() => {
    setLocalQuestion(question);
  }, [question]);

  const updateQuestion = (updates: Partial<Question>) => {
    const updated = { ...localQuestion, ...updates };
    setLocalQuestion(updated);
    onChange(updated);
  };

  const handleTypeChange = (type: QuestionType) => {
    const updated: Question = {
      ...localQuestion,
      type,
      options: type === "multiple-choice" ? ["", "", "", ""] : undefined,
      correctAnswer: type === "true-false" ? "true" : "",
    };
    setLocalQuestion(updated);
    onChange(updated);
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!localQuestion.options) return;
    const updatedOptions = [...localQuestion.options];
    updatedOptions[index] = value;
    updateQuestion({ options: updatedOptions });
  };

  const addOption = () => {
    if (!localQuestion.options) return;
    updateQuestion({
      options: [...localQuestion.options, ""],
    });
  };

  const removeOption = (index: number) => {
    if (!localQuestion.options || localQuestion.options.length <= 2) return;
    const updatedOptions = localQuestion.options.filter((_, i) => i !== index);
    updateQuestion({ options: updatedOptions });
  };

  return (
    <div className="card" style={{ padding: 16, marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h4 style={{ margin: 0 }}>{t("questionForm.question")} {index + 1}</h4>
        <button
          type="button"
          onClick={onDelete}
          className="btn btn-ghost"
          style={{ color: "#ef4444", padding: "4px 8px" }}
        >
          {t("common.delete")}
        </button>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {/* Question Type */}
        <div>
          <label className="form-label">{t("questionForm.questionType")}</label>
          <select
            className="form-input"
            value={localQuestion.type}
            onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
          >
            <option value="multiple-choice">{t("questionForm.multipleChoice")}</option>
            <option value="true-false">{t("questionForm.trueFalse")}</option>
            <option value="fill-blank">{t("questionForm.fillBlank")}</option>
            <option value="short-answer">{t("questionForm.shortAnswer")}</option>
          </select>
        </div>

        {/* Question Text */}
        <div>
          <label className="form-label">{t("questionForm.question")}</label>
          <textarea
            className="form-input"
            rows={3}
            value={localQuestion.question}
            onChange={(e) => updateQuestion({ question: e.target.value })}
            placeholder={t("questionForm.enterQuestion")}
          />
        </div>

        {/* Options for Multiple Choice */}
        {localQuestion.type === "multiple-choice" && (
          <div>
            <label className="form-label">{t("questionForm.options")}</label>
            {localQuestion.options?.map((option, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name={`correct-${index}`}
                  checked={
                    Array.isArray(localQuestion.correctAnswer)
                      ? localQuestion.correctAnswer.includes(option)
                      : localQuestion.correctAnswer === option
                  }
                  onChange={() => updateQuestion({ correctAnswer: option })}
                />
                <input
                  className="form-input"
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={t("questionForm.option").replace("{n}", (idx + 1).toString())}
                  style={{ flex: 1 }}
                />
                {localQuestion.options && localQuestion.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(idx)}
                    className="btn btn-ghost"
                    style={{ padding: "4px 8px" }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="btn btn-ghost"
              style={{ marginTop: 8 }}
            >
              {t("questionForm.addOption")}
            </button>
          </div>
        )}

        {/* True/False */}
        {localQuestion.type === "true-false" && (
          <div>
            <label className="form-label">{t("questionForm.correctAnswer")}</label>
            <div style={{ display: "flex", gap: 12 }}>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="radio"
                  name={`tf-${index}`}
                  checked={localQuestion.correctAnswer === "true"}
                  onChange={() => updateQuestion({ correctAnswer: "true" })}
                />
                {t("questionForm.true")}
              </label>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="radio"
                  name={`tf-${index}`}
                  checked={localQuestion.correctAnswer === "false"}
                  onChange={() => updateQuestion({ correctAnswer: "false" })}
                />
                {t("questionForm.false")}
              </label>
            </div>
          </div>
        )}

        {/* Fill in the Blank / Short Answer */}
        {(localQuestion.type === "fill-blank" ||
          localQuestion.type === "short-answer") && (
          <div>
            <label className="form-label">{t("questionForm.correctAnswer")}</label>
            <input
              className="form-input"
              type="text"
              value={
                Array.isArray(localQuestion.correctAnswer)
                  ? localQuestion.correctAnswer[0] || ""
                  : localQuestion.correctAnswer || ""
              }
              onChange={(e) => updateQuestion({ correctAnswer: e.target.value })}
              placeholder={t("questionForm.enterAnswer")}
            />
            {localQuestion.type === "fill-blank" && (
              <div className="small-muted" style={{ marginTop: 4 }}>
                {t("questionForm.blankTip")}
              </div>
            )}
          </div>
        )}

        {/* Points */}
        <div>
          <label className="form-label">{t("questionForm.points")}</label>
          <input
            className="form-input"
            type="number"
            min="1"
            value={localQuestion.points}
            onChange={(e) =>
              updateQuestion({ points: parseInt(e.target.value) || 1 })
            }
          />
        </div>

        {/* Explanation */}
        <div>
          <label className="form-label">{t("questionForm.explanation")}</label>
          <textarea
            className="form-input"
            rows={2}
            value={localQuestion.explanation || ""}
            onChange={(e) => updateQuestion({ explanation: e.target.value })}
            placeholder={t("questionForm.explainAnswer")}
          />
        </div>
      </div>
    </div>
  );
}

