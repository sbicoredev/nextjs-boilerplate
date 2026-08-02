import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="font-bold text-6xl text-foreground tracking-tight">
          404
        </h1>
        <p className="text-lg text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 font-medium text-primary-foreground text-sm shadow-sm transition-colors hover:bg-primary/90"
        href="/"
      >
        Go back home
      </Link>
    </div>
  );
}
