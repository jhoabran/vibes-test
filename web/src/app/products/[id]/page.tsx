"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProduct } from "@/lib/api";
import { Product } from "../../../../../shared/types";
import Image from "next/image";
import { Navbar } from "@/components/navbar";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      const productData = await getProduct(id);
      setProduct(productData);
    } catch (err) {
      setError("Failed to load product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">
            {error || "Product not found"}
          </div>
          <Link href="/products" className="text-black hover:text-black">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg  overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                <Image
                  src={product.image || "https://picsum.photos/400/400"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                {!product.isAvailable && (
                  <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8">
              <h1 className="text-xl font-semibold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.isAvailable ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Product Details */}
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Product Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-black">Product ID:</span>
                      <span className="font-mono text-sm text-black">
                        {product.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Category:</span>
                      <span className="text-black">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Availability:</span>
                      <span className="text-black">
                        {product.isAvailable ? "Available" : "Not Available"}
                      </span>
                    </div>
                    {product.createdAt && (
                      <div className="flex justify-between">
                        <span className="text-black">Added:</span>
                        <span className="text-black">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Agregar a favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
