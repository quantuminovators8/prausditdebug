import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a Prausdit account.",
};

export default function SignUpPage() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-24 pb-12">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Join Prausdit
          </p>
          <h1 className="text-2xl font-bold text-foreground">
            Create Your Account
          </h1>
        </div>
        <SignUp
          routing="path"
          path="/sign-up"
          fallbackRedirectUrl="/"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card border border-border shadow-none",
            },
          }}
        />
      </div>
    </section>
  );
}
