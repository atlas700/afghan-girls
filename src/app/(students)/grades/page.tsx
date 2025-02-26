import { unstable_cacheTag as cacheTag } from "next/cache";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle/db";
import Link from "next/link";

export default async function GradesPage() {
  const grades = await getGrades();

  return (
    <div className="container my-6">
      <PageHeader title="Grades" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
        {grades.map((grade) => (
          <Card key={grade.id} className="flex flex-col">
            <CardHeader className="flex flex-col gap-3">
              <CardTitle>{grade.description}</CardTitle>
              <CardDescription className="flex gap-1 items-center">
                <Badge className="text-xl">{grade.subjectsCount}</Badge>
                Subjects in PDF
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full mt-auto" variant={"outline"}>
                <Link href={`/grades/${grade.id}`}>Select Grade</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function getGrades() {
  "use cache";

  cacheTag("grades");

  return await db.query.GradesTable.findMany();
}
