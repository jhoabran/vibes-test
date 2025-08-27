import { Product, ProductsResponse, QueryParams } from "../../../shared/types";

export const getProducts = async (queryParams: QueryParams): Promise<ProductsResponse> => {

    const searchParams = queryParams.search ? `search=${queryParams.search}` : "";
    const sort = queryParams.sort ? `sort=${queryParams.sort}` : "";
    const order = queryParams.order ? `order=${queryParams.order}` : "";
    const available = queryParams.available ? `available=${queryParams.available}` : "";
    const limit = queryParams.limit ? `limit=${queryParams.limit}` : "";
    const page = queryParams.page ? `page=${queryParams.page}` : "";

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?${searchParams}&${sort}&${order}&${available}&${limit}&${page}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const getProduct = async (id: string): Promise<Product> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}
