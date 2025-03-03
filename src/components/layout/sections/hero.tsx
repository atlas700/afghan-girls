"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Globe } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 pt-10 md:pt-0">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-16 md:py-24">
          {/* Left content column */}
          <div className="space-y-8 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="text-sm py-2 px-4 mb-6 inline-flex items-center"
              >
                <span className="mr-2">
                  <Badge className="bg-primary hover:bg-primary">Break</Badge>
                </span>
                <span className="font-medium">
                  The Chain of Limited Education!
                </span>
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Learn Beyond
              <span
                className={cn(
                  "text-transparent bg-clip-text px-2 block md:inline",
                  "bg-gradient-to-r from-[#D247BF] via-primary to-[#9747FF]"
                )}
              >
                Limits
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Continue your education from anywhere, anytime. Access lessons,
              quizzes, and resources for grades 7-12, even without internet.
              Your journey to knowledge starts here—safe, simple, and free.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button size="lg" className="font-medium group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                <BookOpen className="mr-2 h-4 w-4" />
                Explore Courses
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p>
                Join{" "}
                <span className="font-semibold text-foreground">1,000+</span>{" "}
                students already learning
              </p>
            </motion.div>
          </div>

          {/* Right image column */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl transform rotate-1 scale-[0.98] blur-sm" />
            <div className="relative overflow-hidden rounded-xl border border-border shadow-xl">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
              <Image
                src="/hero-bg.jpg"
                alt="Educational platform dashboard"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />

              {/* Floating feature badges */}
              <div className="absolute -bottom-4 -right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border shadow-lg">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium">Works Offline</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
