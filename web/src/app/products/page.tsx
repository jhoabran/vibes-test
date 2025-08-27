"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getProducts } from "@/lib/api";
import { Product, QueryParams } from "../../../../shared/types";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/card";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(resolvedSearchParams.search || "");
  const [sort, setSort] = useState<"price" | "name">(
    (resolvedSearchParams.sort as "price" | "name") || "name"
  );
  const [order, setOrder] = useState<"asc" | "desc">(
    (resolvedSearchParams.order as "asc" | "desc") || "asc"
  );
  const [availableFilter, setAvailableFilter] = useState<boolean | undefined>(
    resolvedSearchParams.available
      ? resolvedSearchParams.available === "1"
      : undefined
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(resolvedSearchParams.page || "0")
  );
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 8;

  const updateURL = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (sort !== "name") params.set("sort", sort);
    if (order !== "asc") params.set("order", order);
    if (availableFilter !== undefined)
      params.set("available", availableFilter ? "1" : "0");
    if (currentPage !== 0) params.set("page", currentPage.toString());

    router.push(`/products?${params.toString()}`);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [search, sort, order, availableFilter]);

  useEffect(() => {
    updateURL();
    fetchProducts();
  }, [search, sort, order, availableFilter, currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams: QueryParams = {
        search: search || undefined,
        sort,
        order,
        available: availableFilter,
        limit,
        page: currentPage,
      };

      const response = await getProducts(queryParams);
      console.log(response.total);
      setProducts(response.products);
      setTotalProducts(response.total);
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
                  value === "all" ? undefined : value === "true" ? true : false
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
              <p className="text-gray-600">
                Showing {currentPage * limit + 1}-
                {Math.min(currentPage * limit + products.length, totalProducts)}{" "}
                of {totalProducts} products
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
              {products.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalProducts > limit && (
              <div className="flex justify-center items-center mt-8 gap-4">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
                >
                  Previous
                </button>

                <span className="text-gray-600">
                  Page {currentPage + 1} of {Math.ceil(totalProducts / limit)}
                </span>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(totalProducts / limit) - 1}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
