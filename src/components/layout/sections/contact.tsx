"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BookOpen, HelpCircle, Mail, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  gradeLevel: z.string().min(1),
  inquiryType: z.string().min(2),
  message: z.string(),
});

export const ContactSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gradeLevel: "",
      inquiryType: "General Question",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, gradeLevel, inquiryType, message } = values;
    console.log(values);

    const mailToLink = `mailto:support@educationplatform.org?subject=${inquiryType} - Grade ${gradeLevel}&body=Hello, my name is ${name}, my email is ${email}. %0D%0A${message}`;

    window.location.href = mailToLink;
  }

  return (
    <section id="contact" className="container py-24 sm:py-32 bg-muted/20">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <h2 className="text-lg text-primary mb-2 tracking-wider">
              Support
            </h2>

            <h2 className="text-3xl md:text-4xl font-bold">
              We&apos;re Here to Help
            </h2>
          </div>
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            Have questions about our educational platform? Need help with a
            specific subject? Our team is ready to assist you on your learning
            journey. Reach out to us anytime.
          </p>

          <div className="flex flex-col gap-6">
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="flex gap-3 mb-2">
                <BookOpen className="text-primary" />
                <div className="font-bold">Learning Resources</div>
              </div>

              <div className="text-muted-foreground pl-8">
                Access our comprehensive library of educational materials
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="flex gap-3 mb-2">
                <HelpCircle className="text-primary" />
                <div className="font-bold">Technical Support</div>
              </div>

              <div className="text-muted-foreground pl-8">
                Get help with downloading content or using the platform
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="flex gap-3 mb-2">
                <Mail className="text-primary" />
                <div className="font-bold">Email Us</div>
              </div>

              <div className="text-muted-foreground pl-8">
                support@educationplatform.org
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="flex gap-3 mb-2">
                <MessageSquare className="text-primary" />
                <div className="font-bold">Community Forum</div>
              </div>

              <div className="text-muted-foreground pl-8">
                <div>Connect with other students</div>
                <div>Share experiences and get advice</div>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-background border border-border shadow-sm">
          <CardHeader className="text-primary text-xl font-medium">
            Send us a message
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gradeLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your grade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="7">Grade 7</SelectItem>
                          <SelectItem value="8">Grade 8</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                          <SelectItem value="11">Grade 11</SelectItem>
                          <SelectItem value="12">Grade 12</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inquiryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What can we help you with?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="General Question">
                            General Question
                          </SelectItem>
                          <SelectItem value="Technical Support">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="Subject Help">
                            Subject Help
                          </SelectItem>
                          <SelectItem value="Content Request">
                            Content Request
                          </SelectItem>
                          <SelectItem value="Feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Please describe how we can help you..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="mt-4 w-full">Send Message</Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="text-sm text-muted-foreground text-center">
            We&apos;re committed to supporting your educational journey
          </CardFooter>
        </Card>
      </section>
    </section>
  );
};
