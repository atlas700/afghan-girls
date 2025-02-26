import PdfViewer from "@/components/PDFViewer";
import { db } from "@/drizzle/db";
import { BooksTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ gradeId: string; subjectId: string }>;
}) {
  const { gradeId, subjectId } = await params;

  const subject = await getSubject(gradeId, subjectId);

  if (subject == null) return notFound();

  console.log(subject);

  // const selectedPdfPath = "/pdfs/grade7-math.pdf";
  const selectedPdfPath = subject?.pdfUrl;

  return (
    <div className="container my-12">
      <PdfViewer pdfPath={selectedPdfPath} />
    </div>
  );
}

async function getSubject(gradeId: string, subjectId: string) {
  "use cache";

  cacheTag(`grades-${gradeId}-subjects-${subjectId}`);

  return await db.query.BooksTable.findFirst({
    where: and(
      eq(BooksTable.id, parseInt(subjectId)),
      eq(BooksTable.gradeId, parseInt(gradeId))
    ),
  });
}
