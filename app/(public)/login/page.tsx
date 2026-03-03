import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for the Prausdit platform.",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-24 pb-12">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Admin Access
          </p>
          <h1 className="text-2xl font-bold text-foreground">
            Sign In to Prausdit
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Only authorized administrators and developers can access the
            dashboard.
          </p>
        </div>
        <SignIn
          routing="hash"
          afterSignInUrl="/admin"
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
