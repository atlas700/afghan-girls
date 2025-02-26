"use client";

import { useState } from "react";
import { createGrade } from "./actions";

export function SandboxClient() {
  const [gradeNumber, setGradeNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [subjectsCount, setSubjectsCount] = useState(0);

  const gradeHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGrade({ gradeNumber, description, subjectsCount });
  };

  return (
    <>
      <h1>Adding Grade</h1>
      <form onSubmit={gradeHandleSubmit}>
        <input
          type="number"
          placeholder="grade number"
          onChange={(e) => setGradeNumber(parseInt(e.target.value))}
        />
        <input
          type="text"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="subjects count"
          onChange={(e) => setSubjectsCount(parseInt(e.target.value))}
        />
        <button type="submit">Add grade</button>
      </form>
    </>
  );
}
