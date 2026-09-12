import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { GoogleButton } from "@/components/auth/GoogleButton";

export const metadata: Metadata = { title: "Create an account" };

export default function SignupPage() {
  return (
    <>
      <SiteHeader />
      <AuthLayout
        heading="Plan your first local trip"
        subheading="Create an account to save itineraries, book stays and get community picks."
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-brand-blue">
              Sign in
            </Link>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <GoogleButton />
          <div className="flex items-center gap-3 text-xs font-medium text-ink-500">
            <span className="h-px flex-1 bg-line" />
            or sign up with email
            <span className="h-px flex-1 bg-line" />
          </div>
          <SignupForm />
        </div>
      </AuthLayout>
    </>
  );
}
