import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How can I use this platform without internet?",
    answer:
      "Our platform is designed to work offline. Simply download the lessons, quizzes, and resources you need when you have internet access. Once downloaded, you can access all content without requiring an internet connection. The app will automatically save your progress and sync when you reconnect.",
    value: "item-1",
  },
  {
    question: "What subjects are available on the platform?",
    answer:
      "We offer a comprehensive curriculum covering Mathematics, Science (Biology, Chemistry, Physics), Languages (including Pashto and Dari), History, Geography, Computer Science, and Arts. All subjects are aligned with educational standards for grades 7-12.",
    value: "item-2",
  },
  {
    question: "How do I track my learning progress?",
    answer:
      "The platform includes built-in progress tracking. As you complete lessons and quizzes, your progress is automatically saved. You can view your performance statistics, completed lessons, and quiz scores in the 'My Progress' section of your profile.",
    value: "item-3",
  },
  {
    question: "Is my information private and secure?",
    answer:
      "Yes, we prioritize your privacy and security. The platform doesn't require personal information to use, and any optional data you provide is encrypted and stored securely. We don't share your information with third parties, and you can use the platform anonymously.",
    value: "item-4",
  },
  {
    question: "What if I need help with a specific lesson or concept?",
    answer:
      "You can use our AI Study Assistant feature to ask questions about any lesson or concept. Additionally, the platform includes detailed explanations, examples, and step-by-step solutions for common problems. If you need further assistance, you can reach out through the Contact section.",
    value: "item-5",
  },
  {
    question: "Can I use this platform on multiple devices?",
    answer:
      "Yes, the platform works on various devices including smartphones, tablets, and computers. Your progress will sync across devices when you have internet access, allowing you to continue your learning journey seamlessly.",
    value: "item-6",
  },
];

export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="container md:w-[800px] py-24 sm:py-32 bg-muted/20"
    >
      <div className="text-center mb-12">
        <div className="flex justify-center mb-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
        </div>

        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Have Questions? We&apos;re Here to Help
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our educational platform. If
          you don&apos;t see your question here, feel free to contact us.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="bg-background rounded-lg border border-border"
      >
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left px-4 hover:bg-muted/50">
              {question}
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-4 text-muted-foreground">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">Still have questions?</p>
        <Button variant="outline" className="mx-auto">
          Contact Support
        </Button>
      </div>
    </section>
  );
};
