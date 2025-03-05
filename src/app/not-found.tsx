"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute -z-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="relative inline-block"
            animate={{ rotate: isHovering ? [0, -10, 10, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <BookOpen
              className="h-24 w-24 mx-auto text-primary"
              strokeWidth={1.5}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              404
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          We couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or doesn&apos;t exist.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="default"
            className="flex items-center gap-2"
            onClick={() => router.push("/")}
          >
            <Home className="h-4 w-4" />
            Return Home
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 p-4 border border-border rounded-lg bg-muted/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-medium mb-2">Looking for something specific?</h3>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Button asChild variant="link" className="text-primary">
              <Link href="/grades">Browse Grades</Link>
            </Button>
            <Button asChild variant="link" className="text-primary">
              <Link href="/subjects">Explore Subjects</Link>
            </Button>
            <Button asChild variant="link" className="text-primary">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
