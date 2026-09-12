import { Photo } from "@/components/scenes/Photo";

export function AuthLayout({
  heading,
  subheading,
  children,
  footer,
}: {
  heading: string;
  subheading: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full min-h-[calc(100vh_-_64px)] max-w-[1440px]">
      <div className="flex w-full flex-col justify-center px-6 py-16 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-[400px]">
          <h1 className="font-display text-3xl text-ink-700">{heading}</h1>
          <p className="mt-2 text-ink-500">{subheading}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-sm text-ink-500">{footer}</p>
        </div>
      </div>
      <div className="hidden w-1/2 flex-col justify-center gap-8 bg-ink-900 px-12 py-16 lg:flex">
        <div className="flex flex-col gap-1">
          <p className="font-display text-3xl text-mist-100">15,000+ travelers</p>
          <p className="text-sm font-medium text-mist-300">already planning with a local, not an algorithm</p>
        </div>
        <div className="relative aspect-[560/640] w-full max-w-[420px] overflow-hidden rounded-3xl border border-navy-border">
          <Photo
            src="/images/hero-visual.jpg"
            alt="Mountain valley in Meghalaya — a local guide's off-grid trip, rated 4.8 out of 5 by the community"
            rounded="rounded-none"
            className="h-full w-full"
            sizes="420px"
          />
        </div>
      </div>
    </div>
  );
}
