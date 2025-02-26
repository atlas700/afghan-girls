import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "TabletSmartphone",
    title: "Mobile Friendly",
    description:
      "Work on every type of device especially in mobile and tablet.",
  },
  {
    icon: "BadgeCheck",
    title: "Lessons",
    description: "Clear, simple materials for every subject.",
  },
  {
    icon: "Goal",
    title: "Offline Access",
    description: "Save content for use without internet.",
  },
  {
    icon: "PictureInPicture",
    title: "Strong Visuals",
    description:
      "Everything is clear and made simple for better understanding.",
  },
  {
    icon: "MousePointerClick",
    title: "Quizzes",
    description: "Test your knowledge and track progress.",
  },
  {
    icon: "Newspaper",
    title: "AI Chat",
    description: "Chat with any book by AI to learn deep.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Everything You Need to Learn
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Explore lessons tailored for grades 7-12. Download videos, PDFs, and
        quizzes to study offline. No sign-up needed—just open and start
        learning, privately and securely.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  {/* <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  /> */}
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
