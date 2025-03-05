import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/drizzle/db";
import { GradesTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import {
  ArrowRightIcon,
  BookOpen,
  BookText,
  GraduationCap,
  Loader2Icon,
} from "lucide-react";
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

  // Group subjects by category if available, otherwise use a default category
  const subjectsByCategory: Record<string, typeof grade.books> = {};

  grade.books.forEach((subject) => {
    const category = subject.category || "General Subjects";
    if (!subjectsByCategory[category]) {
      subjectsByCategory[category] = [];
    }
    subjectsByCategory[category].push(subject);
  });

  const categories = Object.keys(subjectsByCategory);

  return (
    <div className="container py-8">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <Loader2Icon className="animate-spin size-12 text-primary" />
          </div>
        }
      >
        <div className="mb-8">
          <PageHeader
            title={grade.description}
          >{`Explore all ${grade.subjectsCount} subjects available for ${grade.description}`}</PageHeader>

          <div className="flex flex-wrap gap-3 mt-4">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary px-3 py-1"
            >
              <GraduationCap className="mr-1 h-4 w-4" />
              Grade {gradeId}
            </Badge>
            <Badge
              variant="outline"
              className="bg-secondary/10 text-secondary px-3 py-1"
            >
              <BookText className="mr-1 h-4 w-4" />
              {grade.subjectsCount} Subjects
            </Badge>
          </div>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader className="bg-muted/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">
                  {grade.description} Curriculum
                </CardTitle>
                <CardDescription className="mt-1">
                  Complete educational materials for Grade {gradeId} students
                </CardDescription>
              </div>

              <Button asChild variant="outline">
                <Link href="/grades">Back to All Grades</Link>
              </Button>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            {categories.length > 1 ? (
              <Tabs defaultValue={categories[0]} className="w-full">
                <TabsList className="mb-6 w-full justify-start overflow-auto">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="px-4"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subjectsByCategory[category].map((subject) => (
                        <SubjectCard
                          key={subject.id}
                          subject={subject}
                          gradeId={gradeId}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grade.books.map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    gradeId={gradeId}
                  />
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4 border-t">
            <p className="text-sm text-muted-foreground">
              All subjects include downloadable content for offline access
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={`/grades/${gradeId}/download-all`}>
                Download All Subjects
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </Suspense>
    </div>
  );
}

// Subject Card Component
function SubjectCard({ subject, gradeId }: { subject: any; gradeId: string }) {
  return (
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-medium">
            {subject.subjectName}
          </CardTitle>
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        {subject.pdfCount && (
          <Badge variant="outline" className="w-fit mt-2">
            {subject.pdfCount} PDFs
          </Badge>
        )}
      </CardHeader>

      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {subject.description ||
            `Educational materials for ${subject.subjectName}`}
        </p>
      </CardContent>

      <CardFooter className="pt-2">
        <Button className="w-full" asChild>
          <Link
            href={`/grades/${gradeId}/${subject.id}`}
            className="flex items-center justify-center gap-2"
          >
            Open Subject
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
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
