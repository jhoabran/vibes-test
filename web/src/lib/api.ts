import { Product, ProductsResponse, QueryParams } from "../../../shared/types";

export const getProducts = async (queryParams: QueryParams): Promise<ProductsResponse> => {
    const searchParams = new URLSearchParams(queryParams as Record<string, string>).toString();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${searchParams}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const getProduct = async (id: string): Promise<Product> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}
