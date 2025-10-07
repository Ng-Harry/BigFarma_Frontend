const Data = ({ props, onViewDetails }) => {
  const {
    images,
    product,
    productID,
    price,
    quantity,
    orders,
    status,
    action,
    location,
  } = props;

  const statusClass =
    status === 'Active'
      ? 'bg-green-100 text-green-800'
      : status === 'Out of stock'
      ? 'bg-red-100 text-red-800'
      : 'bg-gray-100 text-gray-800';

  return (
		<>
			<td>
				<div className="flex items-center gap-2 text-base">
					<img src={images} alt="" className="w-10 h-10 " />
					<p>{product}</p>
				</div>
			</td>
			<td>{productID}</td>
			<td>{quantity}</td>
			<td>{price}</td>
			<td>{location}</td>
			{/* <td>
				<span
					className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
					<span
						className="inline-block w-2 h-2 rounded-full mr-1"
						style={{
							backgroundColor:
								status === "Active"
									? "#10B981"
									: status === "Out of stock"
									? "#EF4444"
									: "#9CA3AF",
						}}></span>
					{status}
				</span>
			</td> */}
			<td>
				<button
					className="p-2.5 px-6 rounded-lg bg-[#EFEFEF] text-[#000000]"
					onClick={onViewDetails}>
					View Details
				</button>
			</td>
		</>
	);
};

export default Data;
