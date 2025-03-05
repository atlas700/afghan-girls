"use client";

import { cn } from "@/lib/utils";
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  Menu,
  Search,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ToggleTheme } from "./toogle-theme";

interface RouteProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface SubjectProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

const mainRoutes: RouteProps[] = [
  {
    href: "/subjects",
    label: "Subjects",
    icon: <BookOpen className="h-4 w-4 mr-2" />,
  },
  {
    href: "/grades",
    label: "Grades",
    icon: <GraduationCap className="h-4 w-4 mr-2" />,
  },
  {
    href: "/chat",
    label: "AI Chat",
    icon: <Search className="h-4 w-4 mr-2" />,
  },
];

const secondaryRoutes: RouteProps[] = [
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

const subjectList: SubjectProps[] = [
  {
    title: "Mathematics",
    description: "Algebra, geometry, and arithmetic with interactive exercises",
    href: "/subjects/math",
  },
  {
    title: "Science",
    description: "Biology, chemistry, and physics with visual experiments",
    href: "/subjects/science",
  },
  {
    title: "Languages",
    description: "Reading, writing, and grammar lessons in multiple languages",
    href: "/subjects/languages",
  },
  {
    title: "History & Social Studies",
    description: "World history, geography, and cultural studies",
    href: "/subjects/history",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "w-full fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "py-2 bg-background/80 backdrop-blur-md shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-lg flex items-center">
          <BookOpen className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 p-1.5 border text-white" />
          <span className="text-xl font-semibold">EduAccess</span>
        </Link>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ToggleTheme />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex flex-col justify-between"
            >
              <div>
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Main Navigation
                    </h3>
                    {mainRoutes.map(({ href, label, icon }) => (
                      <Button
                        key={href}
                        onClick={() => setIsOpen(false)}
                        asChild
                        variant="ghost"
                        className="w-full justify-start text-base"
                      >
                        <Link href={href} className="flex items-center">
                          {icon}
                          {label}
                        </Link>
                      </Button>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Subjects
                    </h3>
                    {subjectList.map(({ href, title }) => (
                      <Button
                        key={href}
                        onClick={() => setIsOpen(false)}
                        asChild
                        variant="ghost"
                        className="w-full justify-start text-base"
                      >
                        <Link href={href}>{title}</Link>
                      </Button>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Support
                    </h3>
                    {secondaryRoutes.map(({ href, label }) => (
                      <Button
                        key={href}
                        onClick={() => setIsOpen(false)}
                        asChild
                        variant="ghost"
                        className="w-full justify-start text-base"
                      >
                        <Link href={href}>{label}</Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter className="mt-auto pt-4">
                <Button className="w-full">Get Started</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {mainRoutes.map((route) =>
                route.label === "Subjects" ? (
                  <NavigationMenuItem key={route.href}>
                    <NavigationMenuTrigger className="bg-transparent">
                      <span className="flex items-center">
                        {route.icon}
                        {route.label}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                        {subjectList.map(({ title, description, href }) => (
                          <Link
                            key={title}
                            href={href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={route.href}>
                    <Link href={route.href} legacyBehavior passHref>
                      <NavigationMenuLink className="flex items-center px-4 py-2 text-sm font-medium">
                        {route.icon}
                        {route.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                Support
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {secondaryRoutes.map(({ href, label }) => (
                <DropdownMenuItem key={href} asChild>
                  <Link href={href}>{label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <ToggleTheme />
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
