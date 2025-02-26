CREATE TABLE "books_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"grade_id" integer NOT NULL,
	"subject_name" text NOT NULL,
	"description" text,
	"pdf_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grades_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"grade_number" integer NOT NULL,
	"description" text NOT NULL,
	"subjects_count" integer NOT NULL,
	CONSTRAINT "grades_table_grade_number_unique" UNIQUE("grade_number")
);
--> statement-breakpoint
CREATE TABLE "quizzes_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"question" text NOT NULL,
	"options" jsonb NOT NULL,
	"correct_answer" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "books_table" ADD CONSTRAINT "books_table_grade_id_grades_table_id_fk" FOREIGN KEY ("grade_id") REFERENCES "public"."grades_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quizzes_table" ADD CONSTRAINT "quizzes_table_book_id_books_table_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books_table"("id") ON DELETE cascade ON UPDATE no action;