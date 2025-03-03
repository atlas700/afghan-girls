import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "TabletSmartphone",
    title: "Device Compatibility",
    description:
      "Seamlessly works across smartphones, tablets, and computers - learn on any device you have access to.",
  },
  {
    icon: "BookOpen",
    title: "Interactive Lessons",
    description:
      "Engaging, structured lessons with clear explanations for all core subjects from grades 7-12.",
  },
  {
    icon: "Download",
    title: "Offline Learning",
    description:
      "Download entire courses to continue learning without internet access - perfect for areas with limited connectivity.",
  },
  {
    icon: "ImagePlus",
    title: "Visual Learning",
    description:
      "Rich illustrations, diagrams, and visual aids that simplify complex concepts for better comprehension.",
  },
  {
    icon: "CheckCircle",
    title: "Self-Assessment",
    description:
      "Practice quizzes and tests with instant feedback to reinforce learning and track your progress.",
  },
  {
    icon: "MessageSquareText",
    title: "AI Study Assistant",
    description:
      "Ask questions about any lesson or textbook and receive helpful explanations from our AI tutor.",
  },
  {
    icon: "Calendar",
    title: "Structured Curriculum",
    description:
      "Organized by grade level and subject with clear learning paths to follow your educational journey.",
  },
  {
    icon: "Shield",
    title: "Privacy-Focused",
    description:
      "No account required, no data collection - your learning stays private and secure.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 bg-muted/30">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Your Complete Learning Toolkit
      </h2>

      <h3 className="md:w-3/4 lg:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-12">
        Our platform provides everything you need for a complete educational
        experience. Access comprehensive lessons, interactive materials, and
        assessment tools designed specifically for grades 7-12 - all available
        offline for uninterrupted learning.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureList.map(({ title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-3 rounded-full ring-8 ring-primary/10 mb-4">
                  {/* <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  /> */}
                </div>

                <CardTitle className="text-center">{title}</CardTitle>
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
