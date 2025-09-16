import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api";
import DashboardLayout from '../dashboard-layout'
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";




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
            <div className="p-6 lg:w-1/2 bg-white rounded-lg shadow">
                <div className="mb-4 w-full lg:w-24">
                    <img
                        src={data.images[0]}
                        alt={data.name}
                        className="w-64 h-64 object-cover rounded"
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
                {data.availability === "in_stock" && <p className="text-[var(--color-primary-dark)]">
                    {data.quantity.split(" ")[0]} in stock
                </p>}

                {/* buttons  */}
                <div className="flex flex-col items-center lg:flex-row gap-1 lg:gap-7 mt-3">
                    <Link to={''} className=" py-2 underline text-[var(--color-primary)] capitalize" >Add to cart</Link>
                    <Link to={''} className=" px-6 py-2 text-white text-center rounded-md capitalize bg-[var(--color-primary)]">View details</Link>
                </div>
                {/* <p>Farmer: {data.farmer.full_name}</p> */}
            </div>
        </DashboardLayout>
    );
}
