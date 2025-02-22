import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-full justify-center text-center max-w-5l gap-6 mx-auto">
      <h1 className="text-5xl font-bold">Your invoice app</h1>
      <p>
        <Button asChild>
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </p>
    </main>
  );
}
