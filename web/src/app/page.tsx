import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Categories Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Shop by Category
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Accessories",
                emoji: "👜",
                href: "/products?search=accessories",
              },
              {
                name: "Footwear",
                emoji: "👟",
                href: "/products?search=footwear",
              },
              {
                name: "Clothing",
                emoji: "👕",
                href: "/products?search=shirts",
              },
              {
                name: "Headgear",
                emoji: "🧢",
                href: "/products?search=headgear",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-black hover:shadow-lg transition-all duration-200"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.emoji}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-black">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-black to-gray-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Browse our complete collection of products
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              View All Products
            </Link>
            <Link
              href="/products?sort=price&order=asc"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Best Deals
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
