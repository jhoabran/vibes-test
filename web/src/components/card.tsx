import Link from "next/link";
import Image from "next/image";
import { Product } from "../../../shared/types";

export function Card({ product }: { product: Product }) {
  return (
    <Link
      key={product.id}
      href={`/products/${product.id}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="aspect-square bg-gray-200 relative overflow-hidden">
        <Image
          src={product.image || "https://picsum.photos/200/200"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          width={200}
          height={200}
        />
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 group-hover:text-black-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 capitalize mb-2">
          {product.category}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-black-600 text-black">
            ${product.price.toFixed(2)}
          </span>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              product.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.isAvailable ? "Available" : "Out of Stock"}
          </span>
        </div>
      </div>
    </Link>
  );
}
