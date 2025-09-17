import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api";
import DashboardLayout from '../dashboard-layout'
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";




export default function ProductDetail() {
    const { id } = useParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Product not found</p>;

    return (
        <DashboardLayout>
            <Link to="/marketplace" className="flex items-center text-[var(--color-neutral)] mb-4 p-2 border border-slate-200 rounded-md w-fit">
                <IoMdArrowBack />
                <span className="ml-2 cursor-pointer font-semibold">Back to results</span>
            </Link>
            <div className="flex flex-col lg:flex-row gap-9">
                <div className="p-6 lg:w-1/2 bg-white rounded-lg shadow">
                    <div className="mb-4 w-full lg:w-24">
                        <img
                            src={data.images[0]}
                            alt={data.name}
                            className="w-full h-64 bg-slate-50 mb-4  object-cover rounded"
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

                    {/* buttons  */}
                    <div className="flex flex-col items-center lg:flex-row gap-1 lg:gap-7 mt-3">
                        <Link to={''} className=" py-2 underline text-[var(--color-primary)] capitalize" >Add to cart</Link>
                        <Link to={''} className=" px-6 py-2 text-white text-center rounded-md capitalize bg-[var(--color-primary)]">View details</Link>
                    </div>
                    {/* <p>Farmer: {data.farmer.full_name}</p> */}
                </div>

                <div className="p-6 w-full lg:w-1/2 bg-white rounded-lg shadow">
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-xl font-semibold capitalize">Fresh {data.name}</h2>

                            {/* details  */}
                            <div className="space-y-3 mt-4 text-lg">
                                <p><span className="font-medium">Category: <span className="capitalize font-normal">{data.category}</span></span>   |  <span className="font-medium">Type: <span className="capitalize font-normal">{data.farmer.farm_type}</span></span>  |  <span className="font-medium">Type: <span className="capitalize font-normal">{data.farmer.farm_location}</span></span></p>
                                <p><span className="font-medium">Availability:</span>{data.availability === "in_stock" ? <span> In Stock</span> : <span>Out of Stock</span>}</p>
                                <p><span className="font-medium">Price:</span> ₦{data.price} per {data.quantity.split(" ").length > 1
                                    ? data.quantity.split(" ").slice(1).join(" ")
                                    : data.quantity}</p>
                            </div>
                        </section>

                        <section>
                            <div className="space-y-3 ">
                                <h2 className="text-xl font-semibold capitalize">Description</h2>
                                <p className="text-lg">{data.description}</p>
                            </div>
                        </section>

                        <section>
                            <div className="space-y-3 ">
                                <h2 className="text-xl font-semibold capitalize">Key Details</h2>
                                <div className="text-lg space-y-2">
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
                            <div className="space-y-3 ">
                                <h2 className="text-xl font-semibold capitalize">Farmer's Details</h2>
                                <div className="flex flex-col gap-2">
                                    <img src={data.farmer.profile_picture} alt={data.farmer.full_name} className="w-14 h-14 bg-slate-50 rounded-full" />
                                    <div className="text-lg">
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
        </DashboardLayout>
    );
}
