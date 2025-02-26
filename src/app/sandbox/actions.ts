"use server";

import { db } from "@/drizzle/db";
import { GradesTable } from "@/drizzle/schema";
import { revalidateTag } from "next/cache";

export async function createGrade({
  gradeNumber,
  description,
  subjectsCount,
}: {
  gradeNumber: number;
  description: string;
  subjectsCount: number;
}) {
  try {
    const createdGrade = await db
      .insert(GradesTable)
      .values({
        subjectsCount,
        gradeNumber,
        description,
      })
      .onConflictDoNothing()
      .returning();

    if (createGrade == null) {
      throw new Error("Failed to save the grade info");
    }
    console.log("Grade created:", createdGrade[0].id);

    revalidateTag("grades");
    revalidateTag(`grades-${createGrade}`);
  } catch (error) {
    console.error("Error creating grade:", error);
  }
}
