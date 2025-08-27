import Link from "next/link";

export function Navbar() {
  return (
    <div className="flex flex-col items-center justify-center h-18 w-full bg-gradient-to-r from-black to-pink-600 relative overflow-hidden ">
      {/* Navigation */}
      <nav className="absolute top-6 left-0 right-0 flex justify-between items-center px-8 z-10">
        <Link
          href="/"
          className="text-white font-bold text-xl hover:text-gray-200 transition-colors"
        >
          🛒 Mini Market
        </Link>
      </nav>
    </div>
  );
}
