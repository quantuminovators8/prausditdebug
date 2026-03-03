"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const { user, isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="glass rounded-xl p-12 text-center neon-glow-cyan">
        <CheckCircle2
          size={48}
          className="mx-auto mb-4 text-[var(--neon-cyan)]"
        />
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          Message Sent
        </h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. We will get back to you if needed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-foreground">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Your name"
            defaultValue={isSignedIn ? user?.fullName || "" : ""}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-foreground">
            Email <span className="text-xs text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            defaultValue={
              isSignedIn
                ? user?.emailAddresses[0]?.emailAddress || ""
                : ""
            }
            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="subject" className="text-foreground">
            Subject <span className="text-destructive">*</span>
          </Label>
          <Input
            id="subject"
            name="subject"
            required
            placeholder="What's this about?"
            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="text-foreground">
            Message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us what you're thinking..."
            className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-[var(--neon-cyan)] text-[var(--background)] hover:bg-[var(--neon-cyan)]/90 font-semibold"
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              <Send size={16} className="mr-2" />
              Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
