import { demoMarketplaceProducts } from "./demoMarketplaceProducts";

export function fetchProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(demoMarketplaceProducts);
        }, 300);
    });
}

export function fetchProductById(id) {
    return new Promise((resolve, reject) => {
        const product = demoMarketplaceProducts.find((p) => p.id === Number(id));
        if (product) {
            resolve(product);
        } else {
            reject(new Error("Product not found"));
        }
    });
}
