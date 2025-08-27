export type Product = {
    id: string;
    name: string;
    price: number;
    isAvailable: boolean;
    category: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type QueryParams = {
    search?: string;
    sort?: 'price' | 'name';
    order?: 'asc' | 'desc';
    limit?: number;
    page?: number;
    available?: boolean;
}

export type ProductsResponse = {
    total: number;
    page?: number;
    limit?: number;
    products: Product[];
}
