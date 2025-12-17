export type QuestionType = "multiple-choice" | "true-false" | "fill-blank" | "short-answer";

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id?: string;
  type: QuestionType;
  question: string;
  options?: string[]; // For multiple-choice
  correctAnswer: string | string[]; // Can be array for multiple correct answers
  points: number;
  explanation?: string;
}

export interface Exercise {
  id?: string;
  title: string;
  description?: string;
  subject: string;
  difficulty: Difficulty;
  timeLimit?: number; // in minutes
  questions: Question[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExerciseResponse {
  exercise?: Exercise;
  exercises?: Exercise[];
  message?: string;
}

