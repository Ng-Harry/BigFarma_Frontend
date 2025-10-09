import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { useCart } from "@/hooks";
import { toast } from "react-toastify";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";

export default function ProductsList({ selectedCategory, onClearCategory }) {
  const { addToCart } = useCart();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Add this to see what categories exist in your data
  if (data?.products) {
    console.log("Available categories in products:",
      [...new Set(data.products.map(p => p.category))]
    );
    console.log("Selected category:", selectedCategory);
  }

  const handleAddToCart = (product) => {
    if (product.availability !== "in_stock") {
      toast.error("This product is out of stock");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  // if (isLoading) return <p>Loading...</p>;
  if (isLoading) return <div className="flex items-center justify-center h-[40vh]"><LoadingSkeleton /></div>;
  if (error) return <p>Error loading products</p>;

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? data.products.filter((product) =>
      product.category?.toLowerCase() === selectedCategory.toLowerCase()
    )
    : data.products;

  return (
    <div>
      {/* Show selected category */}
      {selectedCategory && (
        <div className="mb-4 flex items-center gap-2">
          <p className="text-gray-600">Showing: <span className="font-semibold">{selectedCategory}</span></p>
          <button
            onClick={() => onClearCategory?.()}
            className="text-sm text-red-500 underline"
          >
            Clear filter
          </button>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No products found in this category</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <div className="p-4 bg-white shadow rounded-md">
                <div className="w-full h-48 rounded-t-md bg-slate-100 flex items-center justify-center">
                  <img
                    src={product.images}
                    alt={product.name}
                    className=" object-cover overflow-hidden w-full h-full rounded-t-md"
                  />
                </div>
                {/* details  */}
                <div className="space-y-1">
                  {/* name  */}
                  <div className="flex items-center gap-3 pt-3">
                    <h3 className="font-medium capitalize text-lg">{product.name}</h3>
                    {product.availability === "in_stock" ? <p className="text-xs text-green-700 py-1 px-2 rounded-md bg-green-50 capitalize">In stock</p> : <p className="text-sm text-red-700 p-3 rounded-md bg-red-100 capitalize">Out of stock</p>}
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
                <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-1 mt-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.availability !== "in_stock"}
                    className={`w-full py-2 underline capitalize ${product.availability === "in_stock"
                      ? "text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Add to cart
                  </button>
                  <Link
                    to={`/marketplace/products/${product.id}`}
                    className="w-full py-2 text-white text-center rounded-md capitalize bg-[var(--color-primary)]"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
