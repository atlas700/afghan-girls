"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookOpen, GraduationCap, Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "/avatars/student-1.jpg",
    name: "Fatima Ahmed",
    userName: "12th Grade Student",
    comment:
      "This platform has been life-changing for me. I can study even when internet is down, and the math lessons helped me understand algebra concepts I struggled with for years.",
    rating: 5.0,
  },
  {
    image: "/avatars/student-2.jpg",
    name: "Zahra Noori",
    userName: "10th Grade Student",
    comment:
      "I love that I can download lessons and study at my own pace. The science experiments are explained so clearly, and the quizzes help me check my understanding.",
    rating: 4.8,
  },
  {
    image: "/avatars/student-3.jpg",
    name: "Maryam Hakimi",
    userName: "Teacher & Mentor",
    comment:
      "As someone who helps students in my community, this platform is an incredible resource. The offline capability means we can continue learning despite connectivity challenges.",
    rating: 4.9,
  },
  {
    image: "/avatars/student-4.jpg",
    name: "Laila Karimi",
    userName: "11th Grade Student",
    comment:
      "The language lessons have improved my reading and writing skills tremendously. I can practice anytime, and the AI assistant helps answer my questions when I'm confused.",
    rating: 5.0,
  },
  {
    image: "/avatars/student-5.jpg",
    name: "Soraya Ahmadi",
    userName: "Parent & Home Educator",
    comment:
      "This platform has been essential for my daughter's education. The curriculum is comprehensive, and the ability to study offline means learning never stops in our home.",
    rating: 5.0,
  },
  {
    image: "/avatars/student-6.jpg",
    name: "Zainab Rahmani",
    userName: "9th Grade Student",
    comment:
      "I've improved so much in mathematics and science since using this app. The visual explanations make difficult concepts easy to understand, and I love tracking my progress.",
    rating: 4.9,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32 bg-muted/20">
      <div className="text-center mb-12">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Student Stories
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Hear From Our Learning Community
        </h2>
        
        <div className="flex items-center justify-center gap-8 mt-6 mb-10">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-full p-3 mb-2">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <p className="font-bold text-2xl">1000+</p>
            <p className="text-muted-foreground text-sm">Active Students</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-full p-3 mb-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <p className="font-bold text-2xl">12</p>
            <p className="text-muted-foreground text-sm">Subjects Covered</p>
          </div>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[85%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-background border border-border h-full hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                  </div>
                  <p className="italic text-muted-foreground">{`"${review.comment}"`}</p>
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={review.image}
                        alt={review.name}
                      />
                      <AvatarFallback>{review.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-background border border-border" />
        <CarouselNext className="bg-background border border-border" />
      </Carousel>
    </section>
  );
};
