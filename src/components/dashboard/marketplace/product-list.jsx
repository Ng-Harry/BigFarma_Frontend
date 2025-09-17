import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import Button from "@/components/shared/Button";

export default function ProductsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
            {data.map((product) => (
                <Link key={product.id} to={`/marketplace/products/${product.id}`}>
                    <div className="p-4 bg-white shadow rounded-md">
                        <div className="w-full h-48 rounded-t-md bg-slate-100 flex items-center justify-center">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className=""
                            />
                        </div>
                        {/* details  */}
                        <div className="space-y-1">
                            {/* name  */}
                            <div className="flex items-center gap-3 pt-3">
                                <h3 className="font-medium capitalize text-lg">{product.name}</h3>
                                {product.availability === "in_stock" ? <p className="text-xs text-green-700 py-1 px-2 rounded-md bg-green-100 capitalize">In stock</p> : <p className="text-sm text-red-700 p-3 rounded-md bg-red-100 capitalize">Out of stock</p>}
                            </div>

                            {/* price  */}
                            <div className="flex items-center gap-1">
                                <p className="font-semibold">₦{product.price}</p>
                                <p className="font-normal text-sm">per {product.quantity.split(" ").length > 1
                                    ? product.quantity.split(" ").slice(1).join(" ")
                                    : product.quantity}</p>
                            </div>
                            { /* rating  */}

              <div className="flex items-center gap-1">
                <IoIosStar className="inline text-yellow-500" />
                <p className="text-sm">
                  {product.average_rating} ({product.total_ratings})
                </p>
              </div>
            </div>

            {/* buttons  */}
            <div className="flex flex-col items-center lg:flex-row gap-1 mt-3">
              <Link
                to={""}
                className="w-full py-2 underline text-[var(--color-primary)] capitalize"
              >
                Add to cart
              </Link>
              <Link
                to={""}
                className="w-full py-2 text-white text-center rounded-md capitalize bg-[var(--color-primary)]"
              >
                View details
              </Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
