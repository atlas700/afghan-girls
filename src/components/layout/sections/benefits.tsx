import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "BookOpen",
    title: "Accessible Learning",
    description:
      "Access quality education anytime, anywhere - even without internet. Our offline-first approach ensures learning never stops, regardless of connectivity challenges.",
  },
  {
    icon: "GraduationCap",
    title: "Comprehensive Curriculum",
    description:
      "Explore a full range of subjects from grades 7-12 including Mathematics, Science, Languages, and more - all aligned with educational standards.",
  },
  {
    icon: "BarChart",
    title: "Track Your Progress",
    description:
      "Monitor your learning journey with built-in assessments and progress tracking. Set goals, complete quizzes, and watch your knowledge grow over time.",
  },
  {
    icon: "Users",
    title: "Community Support",
    description:
      "Join a supportive learning community where students can share resources, ask questions, and motivate each other to achieve educational goals.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Education Without Barriers
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {
              "In a world where learning opportunities can be limited, we bring education directly to you. Designed especially for students in challenging environments, our platform offers a complete curriculum covering essential subjects, helping you build knowledge and prepare for a brighter future."
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  {/* <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  /> */}
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
