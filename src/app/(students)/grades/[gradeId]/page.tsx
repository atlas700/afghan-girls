import { PageHeader } from "@/components/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/drizzle/db";
import { GradesTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { unstable_cacheTag as cacheTag } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function GradePage({
  params,
}: {
  params: Promise<{ gradeId: string }>;
}) {
  const { gradeId } = await params;

  if (gradeId == null) return notFound();

  const grade = await getGrade(gradeId);

  if (grade == null) return notFound();

  return (
    <div className="container my-6">
      <Suspense fallback={<Loader2Icon className="animate-spin size-12" />}>
        <PageHeader title={`${grade.description} with all the subjects`} />
        <Card>
          <CardHeader className="flex gap-3 flex-row items-center justify-between">
            <CardTitle>{grade.description}</CardTitle>
            <CardDescription className="flex gap-1 items-center">
              <Badge className="text-xl">{grade.subjectsCount}</Badge>
              Subjects in PDF
            </CardDescription>
          </CardHeader>
          <Separator className="mb-3" />
          <CardContent className="flex flex-col gap-7">
            <CardTitle>Subjects</CardTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {grade.books.map((subject) => (
                <Accordion key={subject.id} type="multiple">
                  <AccordionItem value={subject.id.toString()}>
                    <AccordionTrigger className="text-2xl md:text-3xl font-semibold">
                      <Link href={`/grades/${gradeId}/${subject.id}`}>
                        {subject.subjectName}
                      </Link>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 items-start justify-between">
                      <h2 className="text-base font-medium text-gray-500">
                        {subject.description}
                      </h2>
                      <Button
                        size={"sm"}
                        variant={"secondary"}
                        className="w-full"
                        asChild
                      >
                        <Link href={`/grades/${gradeId}/${subject.id}`}>
                          Select Subject <ArrowRightIcon />
                        </Link>
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}

async function getGrade(gradeId: string) {
  "use cache";

  cacheTag(`grades-${gradeId}`);

  return await db.query.GradesTable.findFirst({
    where: eq(GradesTable.id, +gradeId),
    with: {
      books: true,
    },
  });
}
