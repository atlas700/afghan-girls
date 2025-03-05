import { Separator } from "@/components/ui/separator";
import { BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="#" className="flex font-bold items-center">
              <BookOpen className="w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary p-1.5 rounded-lg border border-secondary" />

              <h3 className="text-2xl">EduAccess</h3>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Providing accessible education for all students, regardless of
              connectivity challenges.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Resources</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Lessons Library
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Study Guides
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Practice Tests
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Platforms</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                iOS App
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Android App
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Web Version
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Support</h3>
            <div>
              <Link href="#contact" className="opacity-60 hover:opacity-100">
                Contact Us
              </Link>
            </div>

            <div>
              <Link href="#faq" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Technical Help
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">About</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Our Mission
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Privacy Policy
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-sm text-muted-foreground">
            &copy; 2024 EduAccess. All rights reserved.
          </h3>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Supported by</span>
            <Link
              target="_blank"
              href="#"
              className="flex items-center gap-1 text-primary transition-all hover:underline"
            >
              Education Without Borders
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
