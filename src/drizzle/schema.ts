import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createdAt } from "./schemaHelpers";

// Grades table
export const GradesTable = pgTable("grades_table", {
  id: serial("id").primaryKey(),
  gradeNumber: integer("grade_number").notNull().unique(),
  description: text("description").notNull(),
  subjectsCount: integer("subjects_count").notNull(),
});

export const gradesRelations = relations(GradesTable, ({ many }) => ({
  books: many(BooksTable),
}));

// Books table
export const BooksTable = pgTable("books_table", {
  id: serial("id").primaryKey(),
  gradeId: integer("grade_id")
    .notNull()
    .references(() => GradesTable.id, { onDelete: "cascade" }),
  subjectName: text("subject_name").notNull(),
  description: text("description"),
  pdfUrl: text("pdf_url").notNull(),
});

export const booksRelations = relations(BooksTable, ({ one, many }) => ({
  grade: one(GradesTable, {
    fields: [BooksTable.gradeId],
    references: [GradesTable.id],
  }),
  quizzes: many(QuizzesTable),
}));

// Quizzes table
export const QuizzesTable = pgTable("quizzes_table", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id")
    .notNull()
    .references(() => BooksTable.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  options: jsonb("options").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  createdAt,
});

export const quizzesRelations = relations(QuizzesTable, ({ one }) => ({
  book: one(BooksTable, {
    fields: [QuizzesTable.bookId],
    references: [BooksTable.id],
  }),
}));
