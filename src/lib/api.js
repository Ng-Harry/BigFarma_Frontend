// import { demoMarketplaceProducts } from "./demoMarketplaceProducts";

export async function fetchProducts() {
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(demoMarketplaceProducts);
    //     }, 300);
    // });

    const res = await fetch(
        "https://jellyfish-app-2-i2mfu.ondigitalocean.app/api/v1/marketplace/products?skip=0&limit=100"
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data;
}

export async function fetchProductById(id) {

    const res = await fetch(
        `https://jellyfish-app-2-i2mfu.ondigitalocean.app/api/v1/marketplace/products/${id}`
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch product with ID`);
    }

    const data = await res.json();
    return data; // Adjust this if your API response shape differs
    // return new Promise((resolve, reject) => {
    //     const product = demoMarketplaceProducts.find((p) => p.id === Number(id));
    //     if (product) {
    //         resolve(product);
    //     } else {
    //         reject(new Error("Product not found"));
    //     }
    // });
}
