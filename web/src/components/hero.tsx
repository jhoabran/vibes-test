import Link from "next/link";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-96 w-full bg-gradient-to-r from-black to-pink-600 relative overflow-hidden border-b-2 rounded-b-4xl ">
      {/* Navigation */}
      <nav className="absolute top-6 left-0 right-0 flex justify-between items-center px-8 z-10">
        <Link
          href="/"
          className="text-white font-bold text-xl hover:text-gray-200 transition-colors"
        >
          🛒 Mini Market
        </Link>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center text-center z-10">
        <div className="flex flex-col items-center justify-center max-w-4xl px-8 gap-6">
          <h1 className="text-5xl font-bold text-white mb-4">
            Your Mini Market
          </h1>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            Discover some of the best products in the market right now, they are
            hot and ready to be bought.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
    </div>
  );
}
