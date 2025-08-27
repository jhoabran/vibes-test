"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import { Product, QueryParams } from "../../../../shared/types";
import { Hero } from "@/components/hero";
import Image from "next/image";
import { Navbar } from "@/components/navbar";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(searchParams.search || "");
  const [sort, setSort] = useState<"price" | "name">("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [availableFilter, setAvailableFilter] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    fetchProducts();
  }, [search, sort, order, availableFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams: QueryParams = {
        search: search || undefined,
        sort,
        order,
        available: availableFilter,
        limit: 10,
      };

      const response = await getProducts(queryParams);
      setProducts(response.products);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-center my-10 items-center">
            <h1 className="text-3xl font-bold text-gray-800">Our products</h1>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 focus:border-transparent text-black"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "price" | "name")}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 text-black"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>

            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 text-black"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <select
              value={
                availableFilter === undefined
                  ? "all"
                  : availableFilter.toString()
              }
              onChange={(e) => {
                const value = e.target.value;
                setAvailableFilter(
                  value === "all" ? undefined : value === "true"
                );
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 text-black"
            >
              <option value="all">All Products</option>
              <option value="true">Available Only</option>
              <option value="false">Unavailable Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading products...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-xl text-red-600">{error}</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">No products found</div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">{products.length} products found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
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
                        <span className="text-white font-semibold">
                          Out of Stock
                        </span>
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
                      <span className="text-lg font-bold text-black-600">
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
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
