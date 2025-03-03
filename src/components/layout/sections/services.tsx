import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum SubjectLevel {
  ADVANCED = 1,
  STANDARD = 0,
}

interface SubjectProps {
  title: string;
  level: SubjectLevel;
  description: string;
  icon?: string;
}

const subjectList: SubjectProps[] = [
  {
    title: "Mathematics",
    description:
      "Algebra, geometry, and arithmetic with interactive exercises and step-by-step solutions.",
    level: 0,
    icon: "Calculator",
  },
  {
    title: "Science",
    description:
      "Biology, chemistry, and physics with visual experiments and practical applications.",
    level: 0,
    icon: "Flask",
  },
  {
    title: "Languages",
    description:
      "Reading, writing, and grammar lessons in multiple languages with audio support.",
    level: 0,
    icon: "Languages",
  },
  {
    title: "Computer Science",
    description:
      "Programming basics, computational thinking, and technology literacy.",
    level: 1,
    icon: "Code",
  },
  {
    title: "History & Social Studies",
    description:
      "World history, geography, and cultural studies with interactive timelines.",
    level: 0,
    icon: "Globe",
  },
  {
    title: "Arts & Music",
    description:
      "Creative expression through visual arts, music theory, and artistic techniques.",
    level: 1,
    icon: "Music",
  },
];

export const SubjectsSection = () => {
  return (
    <section id="subjects" className="container py-24 sm:py-32 bg-muted/30">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Subjects
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Comprehensive Curriculum
      </h2>
      <h3 className="md:w-3/5 mx-auto text-xl text-center text-muted-foreground mb-12">
        Our platform offers a wide range of subjects designed to provide a
        well-rounded education. Each subject includes lessons, exercises, and
        assessments to support your learning journey.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
        {subjectList.map(({ title, description, level }) => (
          <Card
            key={title}
            className="bg-background border border-border h-full relative hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/* Icon would go here */}
                {title}
              </CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </CardHeader>
            <Badge
              data-advanced={SubjectLevel.ADVANCED === level}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[advanced=false]:hidden bg-primary text-primary-foreground"
            >
              ADVANCED
            </Badge>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-6">
          All subjects are available offline and include grade-appropriate
          content for students aged 12-18
        </p>
        <Badge variant="outline" className="text-sm py-1 px-3">
          <span className="text-primary font-medium">
            New subjects added regularly
          </span>
        </Badge>
      </div>
    </section>
  );
};
