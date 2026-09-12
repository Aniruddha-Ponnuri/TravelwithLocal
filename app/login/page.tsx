import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { FormError } from "@/components/auth/FormError";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : undefined;
  const checkEmail = sp.checkEmail === "1";
  const error = typeof sp.error === "string" ? sp.error : null;

  return (
    <>
      <SiteHeader />
      <AuthLayout
        heading="Welcome back"
        subheading="Sign in to pick up your plans and saved local picks."
        footer={
          <>
            New here?{" "}
            <Link href="/signup" className="font-medium text-brand-blue">
              Create an account
            </Link>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          {checkEmail ? (
            <FormError message="Check your email to confirm your account, then sign in below." />
          ) : null}
          {error ? <FormError message={error} /> : null}
          <GoogleButton next={next} />
          <div className="flex items-center gap-3 text-xs font-medium text-ink-500">
            <span className="h-px flex-1 bg-line" />
            or sign in with email
            <span className="h-px flex-1 bg-line" />
          </div>
          <LoginForm next={next} />
        </div>
      </AuthLayout>
    </>
  );
}
