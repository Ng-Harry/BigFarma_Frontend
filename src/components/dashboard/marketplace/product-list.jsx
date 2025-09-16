import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api";
import { Link } from "react-router-dom";

export default function ProductsList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading products</p>;

    return (
        <div className="grid grid-cols-3 gap-4">
            {data.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                    <div className="p-4 border rounded">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-40 object-cover"
                        />
                        <h3 className="font-semibold">{product.name}</h3>
                        <p>{product.location}</p>
                        <p>₦{product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
