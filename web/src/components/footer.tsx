import Link from "next/link";

export function Footer() {
  return (
    <footer className=" bg-black text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>
          &copy; 2024 Mini Market. Made with ❤️ by{" "}
          <Link
            href="https://miguelvalera.pro"
            className="text-blue-500 hover:text-blue-600"
          >
            José Miguel Valera
          </Link>
        </p>
      </div>
    </footer>
  );
}
