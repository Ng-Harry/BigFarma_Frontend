const baseURL = import.meta.env.VITE_SERVER_URL;

export async function fetchProducts() {
    try {
        const res = await fetch(
            `${baseURL}/marketplace/products?skip=0&limit=100`
        );
        
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("Products API response:", data); // Debug log
        return data;
    } catch (error) {
        console.error("Error in fetchProducts:", error);
        throw error;
    }
}

export async function fetchProductById(id) {
    try {
        const res = await fetch(
            `${baseURL}/marketplace/products/${id}`
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch product with ID: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Product detail API response:", data); // Debug log
        return data;
    } catch (error) {
        console.error(`Error in fetchProductById for ID ${id}:`, error);
        throw error;
    }
}
