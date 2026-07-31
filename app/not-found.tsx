import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h2 className="text-4xl font-black text-primary mb-4">Oops! 404</h2>
      <p className="text-xl opacity-70 mb-8">It seems you wandered into a forbidden forest!</p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
      >
        Go Home
      </Link>
    </div>
  );
}
