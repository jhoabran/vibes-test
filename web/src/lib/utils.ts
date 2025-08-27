import { Product } from "../../../shared/types";

export function getTopCheapestAvailableProducts(products: Product[], top = 3) {
    return products
        .filter((product) => product.isAvailable)
        .sort((a, b) => a.price - b.price)
        .slice(0, top);
}


