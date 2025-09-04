
const Data = ({ props,  onViewDetails }) => {
  const {images, product, quantity, price, location } = props;

  return (
    <>
      <td>
        <div className="flex items-center gap-2 text-base">
         <img src={images} alt="" className="w-10 h-10 " />
          <p>{product}</p>
        </div>
      </td>
      <td>{quantity}</td>
      <td>#{price?.toLocaleString()}</td>
      <td>{location}</td>
      <td>
        <button
          className="p-2.5 px-6 rounded-lg bg-[#EFEFEF] text-[#000000]"
          onClick={onViewDetails}
        >
          View Details
        </button>
      </td>
    </>
  );
};

export default Data;
