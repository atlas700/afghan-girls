import { unstable_cacheTag as cacheTag } from "next/cache";
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
import { db } from "@/drizzle/db";
import Link from "next/link";
import { BookOpen, ChevronRight, Clock, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

export default async function GradesPage() {
  const grades = await getGrades();

  return (
    <div className="container py-12">
      <PageHeader title="Select Your Grade">
        <p>
          Choose your grade level to access subject materials, lessons, and
          resources
        </p>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Suspense>
          {grades.map((grade) => (
            <Card
              key={grade.id}
              className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 group"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge
                      variant="outline"
                      className="mb-2 bg-primary/10 text-primary"
                    >
                      Grade {grade.id}
                    </Badge>
                    <CardTitle className="text-2xl">
                      {grade.description}
                    </CardTitle>
                  </div>
                  <div className="bg-muted rounded-full p-2 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                </div>
                <CardDescription className="mt-2">
                  Complete curriculum for {grade.description} students
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>
                      <strong>{grade.subjectsCount}</strong> Subjects
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>~40 hours content</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Offline availability
                    </span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">
                    Key subjects include:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Mathematics", "Science", "Language"].map((subject) => (
                      <Badge
                        key={subject}
                        variant="secondary"
                        className="bg-secondary/30"
                      >
                        {subject}
                      </Badge>
                    ))}
                    {grade.subjectsCount > 3 && (
                      <Badge variant="secondary" className="bg-secondary/30">
                        +{grade.subjectsCount - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-2 mt-auto">
                <Button
                  asChild
                  className={cn(
                    "w-full group-hover:bg-primary group-hover:text-primary-foreground",
                    "transition-colors duration-300 flex items-center justify-between"
                  )}
                  variant="outline"
                >
                  <Link href={`/grades/${grade.id}`}>
                    <span>Explore Grade {grade.id}</span>
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Suspense>
      </div>

      <div className="mt-12 p-6 bg-muted/50 rounded-lg border border-border text-center">
        <h3 className="text-lg font-medium mb-2">
          Need help finding your grade?
        </h3>
        <p className="text-muted-foreground mb-4">
          If you&apos;re unsure which grade to select, you can take our
          placement assessment or contact our support team for guidance.
        </p>
        <Button variant="secondary">Take Placement Assessment</Button>
      </div>
    </div>
  );
}

async function getGrades() {
  "use cache";

  cacheTag("grades");

  return await db.query.GradesTable.findMany();
}
