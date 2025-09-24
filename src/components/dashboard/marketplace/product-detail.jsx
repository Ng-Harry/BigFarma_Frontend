import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api";
import { demoMarketplaceProducts } from "@/lib/demoMarketplaceProducts"; // ⬅️ import your mock list
import { IoMdArrowBack, IoIosStar } from "react-icons/io";
import { FaCheck, FaPlus, FaMinus } from "react-icons/fa6";
import { useCart } from "@/hooks";
import { toast } from "react-toastify";


export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id),
    });

    const handleAddToCart = (product) => {
        if (product.availability !== "in_stock") {
            toast.error("This product is out of stock");
            return;
        }
        addToCart(product, quantity);
        toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`);
    };

    const handleAddSimilarToCart = (product) => {
        if (product.availability !== "in_stock") {
            toast.error("This product is out of stock");
            return;
        }
        addToCart(product, 1);
        toast.success(`${product.name} added to cart!`);
    };

    const handleBuyNow = (product) => {
        if (product.availability !== "in_stock") {
            toast.error("This product is out of stock");
            return;
        }
        addToCart(product, quantity);
        toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`);
        navigate('/checkout');
    };

    const incrementQuantity = () => {
        const maxStock = parseInt(data.quantity.split(" ")[0]) || 999;
        if (quantity < maxStock) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Product not found</p>;

    // ✅ Find similar products from your mock list
    const similar = demoMarketplaceProducts.filter(
        (item) => item.category === data.category && item.id !== data.id
    );

    return (
        <>
            <Link
                to="/marketplace"
                className="flex items-center text-[var(--color-neutral)] mb-4 p-2 border border-slate-200 rounded-md w-fit"
            >
                <IoMdArrowBack />
                <span className="ml-2 cursor-pointer font-semibold">Back to results</span>
            </Link>

            {/* existing product detail code... */}

            <div className="flex flex-col lg:flex-row gap-9">
                <div className="p-6 lg:w-1/2 bg-white rounded-lg shadow">
                    <div className="mb-4 lg:w-full h-64 lg:h-96 lg:mb-10">
                        <img
                            src={data.images[0]}
                            alt={data.name}
                            className="h-full bg-slate-50 mb-4  object-cover rounded"
                        />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-2xl font-semibold capitalize">{data.name}</h1>
                        {data.availability === "in_stock" ? <p className=" w-fit text-md text-green-700 py-1 px-4 rounded-md bg-green-100 capitalize">In stock</p> : <p className=" w-fit text-md text-red-700 py-1 px-4 rounded-md bg-red-100 capitalize">Out of stock</p>}
                    </div>
                    <p className="text-gray-600">{data.description}</p>
                    <div className="flex items-center gap-2 my-4">
                        <p className="font-semibold text-xl">₦{data.price}</p>
                        <p className="font-normal text-sm">per {data.quantity.split(" ").length > 1
                            ? data.quantity.split(" ").slice(1).join(" ")
                            : data.quantity}</p>
                    </div>
                    {data.availability === "in_stock" && <p className="text-[var(--color-primary)]">
                        {data.quantity.split(" ")[0]} in stock
                    </p>}

                    {/* Quantity selector */}
                    {data.availability === "in_stock" && (
                        <div className="flex items-center gap-3 my-4">
                            <span className="text-sm font-medium">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                    onClick={decrementQuantity}
                                    disabled={quantity <= 1}
                                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaMinus className="h-3 w-3" />
                                </button>
                                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={incrementQuantity}
                                    disabled={quantity >= parseInt(data.quantity.split(" ")[0])}
                                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaPlus className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* buttons  */}
                    <div className="flex justify-between  items-center gap-1 lg:justify-start lg:gap-7 mt-3">
                        <button
                            onClick={() => handleAddToCart(data)}
                            disabled={data.availability !== "in_stock"}
                            className={`py-2 underline capitalize ${
                                data.availability === "in_stock" 
                                    ? "text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] cursor-pointer" 
                                    : "text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Add {quantity > 1 ? `${quantity} ` : ''}to cart
                        </button>
                        <button 
                            onClick={() => handleBuyNow(data)}
                            disabled={data.availability !== "in_stock"}
                            className={`px-6 py-2 text-white text-center rounded-md capitalize ${
                                data.availability === "in_stock" 
                                    ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] cursor-pointer" 
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Buy now
                        </button>
                    </div>
                </div>

                <div className="p-6 w-full lg:w-1/2 bg-white rounded-lg shadow">
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-lg font-semibold capitalize lg:text-xl">Fresh {data.name}</h2>

                            {/* details  */}
                            <div className="space-y-3 mt-4 text-sm lg:text-lg">
                                <p><span className="font-medium">Category: <span className="capitalize font-normal">{data.category}</span></span>   |  <span className="font-medium">Type: <span className="capitalize font-normal">{data.farmer.farm_type}</span></span>  |  <span className="font-medium">Origin: <span className="capitalize font-normal">{data.farmer.farm_location}</span></span></p>
                                <p><span className="font-medium">Availability:</span>{data.availability === "in_stock" ? <span> In Stock</span> : <span>Out of Stock</span>}</p>
                                <p><span className="font-medium">Price:</span> ₦{data.price} per {data.quantity.split(" ").length > 1
                                    ? data.quantity.split(" ").slice(1).join(" ")
                                    : data.quantity}</p>
                            </div>
                        </section>

                        <section>
                            <div className="space-y-3 lg:space-y-4 ">
                                <h2 className="text-lg font-semibold capitalize lg:text-xl">Description</h2>
                                <p className="text-sm lg:text-lg">{data.description}</p>
                            </div>
                        </section>

                        <section>
                            <div className="space-y-3 lg:space-y-4 ">
                                <h2 className="text-lg font-semibold capitalize lg:text-xl">Key Details</h2>
                                <div className="text-sm space-y-2 lg:text-xl">
                                    <span className="flex items-center gap-2">
                                        <FaCheck />
                                        <p>Fresh, high-quality produce</p>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaCheck />
                                        <p>Bulk packaging <span className="capitalize">(per {data.quantity.split(" ").length > 1
                                            ? data.quantity.split(" ").slice(1).join(" ")
                                            : data.quantity})</span></p>
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <FaCheck />
                                        <p>Delivery within 2-5 days</p>
                                    </span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="space-y-3 lg:space-y-4 ">
                                <h2 className="text-lg font-semibold capitalize lg:text-xl">Farmer's Details</h2>
                                <div className="flex flex-col gap-2">
                                    <img src={data.farmer.profile_picture} alt={data.farmer.full_name} className="w-14 h-14 bg-slate-50 rounded-full" />
                                    <div className="text-sm lg:text-lg">
                                        <p><span className="font-medium capitalize">Name:</span> {data.farmer.full_name}</p>
                                        <p><span className="font-medium capitalize">Location:</span> {data.farmer.farm_location}</p>
                                        <p><span className="font-medium capitalize">Farm type:</span> {data.farmer.farm_type}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>



            <div className="flex justify-between items-center my-8">
                <h4 className="font-semibold text-black text-xl">Similar Products</h4>
            </div>

            {/* ✅ suggestions */}
            {similar.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {similar.map((item) => (
                        <div key={item.id} >
                            <div className="p-4 bg-white shadow rounded-md">
                                <div className="w-full h-48 rounded-t-md bg-slate-100 flex items-center justify-center">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-fit"
                                    />
                                </div>
                                {/* details  */}
                                <div className="space-y-1">
                                    {/* name  */}
                                    <div className="flex items-center gap-3 pt-3">
                                        <h3 className="font-medium capitalize text-lg">{item.name}</h3>
                                        {item.availability === "in_stock" ? <p className="text-xs text-green-700 py-1 px-2 rounded-md bg-green-100 capitalize">In stock</p> : <p className="text-sm text-red-700 p-3 rounded-md bg-red-100 capitalize">Out of stock</p>}
                                    </div>

                                    {/* price  */}
                                    <div className="flex items-center gap-1">
                                        <p className="font-semibold">₦{item.price}</p>
                                        <p className="font-normal text-sm">per {item.quantity.split(" ").length > 1
                                            ? item.quantity.split(" ").slice(1).join(" ")
                                            : item.quantity}</p>
                                    </div>
                                    { /* rating  */}

                                    <div className="flex items-center gap-1">
                                        <IoIosStar className="inline text-yellow-500" />
                                        <p className="text-sm">
                                            {item.average_rating} ({item.total_ratings})
                                        </p>
                                    </div>
                                </div>

                                {/* buttons  */}
                                <div className="flex flex-col items-center lg:flex-row gap-1 mt-3">
                                    <button
                                        onClick={() => handleAddSimilarToCart(item)}
                                        disabled={item.availability !== "in_stock"}
                                        className={`w-full py-2 underline capitalize ${
                                            item.availability === "in_stock" 
                                                ? "text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] cursor-pointer" 
                                                : "text-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        Add to cart
                                    </button>
                                    <Link
                                        to={`/marketplace/products/${item.id}`}
                                        className="w-full py-2 text-white text-center rounded-md capitalize bg-[var(--color-primary)]"
                                    >
                                        View details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No similar products found</p>
            )}
        </>
    );
}
