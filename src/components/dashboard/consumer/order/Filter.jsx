import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const STATUS_OPTIONS = [
  "All",
  "Shipping In Progress",
  "Awaiting Confirmation",
  "Delivery Issue - Pending Review",
  "Delivered",
];

const OrderFilter = ({ onSearch, onFilter }) => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const dropdownRef = useRef(null);

  const handleSelect = (status) => {
    setSelectedStatus(status);
    setShowDropdown(false);
    onFilter(status);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center mt-2.5 gap-4">
      {/* Search Input with icon */}
      <div className="relative max-w-[497px] w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search orders, farmer, order"
          className="pl-10 pr-4 py-3 border border-[#DDD5DD] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="relative flex items-center gap-2" ref={dropdownRef}>
        <p className="whitespace-nowrap">Filter:</p>
        <button
          className="flex items-center justify-between gap-2 border border-[#E6E6E6] w-[392px] rounded-lg p-3.5 bg-white"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {selectedStatus}{" "}
          {showDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <AnimatePresence>
          {showDropdown && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-1 right-0 w-[392px] bg-white border rounded shadow-lg z-50 overflow-hidden"
            >
              {STATUS_OPTIONS.map((status) => (
                <li
                  key={status}
                  onClick={() => handleSelect(status)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {status}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderFilter;
