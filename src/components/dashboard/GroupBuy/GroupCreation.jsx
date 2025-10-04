import React from "react";
import { Plus, ChevronDown } from "lucide-react";
import { GroupData } from "@/lib/GroupBuy";
import { getStatusText, getStatusClasses } from "@/utils/GroupBuyStatus";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
const Category = [
  "Vegetable",
  "Fruits",
  "Grains",
  "Livestock",
  "Root",
  "Oil",
  "Nuts",
];
const Location = [
  "Kano",
  "Lagos",
  "Jos",
  "Edo",
  "Delta",
  "Enugu",
  "Cross River",
];

const GroupCreation = () => {
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openLocation, setOpenLocation] = React.useState(false);

  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-col justify-center space-y-2 gap-2">
        <div className="flex justify-between items-center p-2">
          <div className="space-y-2">
            <h2 className="font-bold text-2xl">Group Buy</h2>
            <p>Join group purchases to get better prices on quality goods</p>
          </div>
          <div>
            <Link to={"/group-buy/create"}>
              <button className="w-55 bg-[#016130] hover:bg-[#003F1F] inline-flex items-center justify-center gap-[3px] rounded-[8px] py-3 font-medium transition-colors focus:outline-none text-white">
                <Plus />
                Create A Group
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full  flex  items-center justify-between relative">
          <div className="w-115 flex flex-col items-center justify-between bg-white">
            <div className="flex justify-between items-center w-full rounded-lg p-2.5 border border-[#E6E6E6] hover:bg-gray-100">
              <p>All Categories</p>
              <button>
                <ChevronDown onClick={() => setOpenCategory(!openCategory)} />
              </button>
            </div>
            <AnimatePresence>
              {openCategory && (
                <motion.div
                  key="category-dropdown"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full p-3 overflow-hidden"
                >
                  {Category.map((item) => (
                    <div className="flex gap-3 p-2" key={item}>
                      <input
                        type="checkbox"
                        id={item}
                        name={item}
                        className="accent-green-900"
                      />
                      <label htmlFor={item}>{item}</label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="w-115 flex flex-col items-center justify-between bg-white">
            <div className="flex justify-between items-center w-full rounded-lg p-2.5 border border-[#E6E6E6] hover:bg-gray-100">
              <p>All Locations</p>
              <button>
                <ChevronDown onClick={() => setOpenLocation(!openLocation)} />
              </button>
            </div>

            <AnimatePresence>
              {openLocation && (
                <motion.div
                  key="category-dropdown"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full p-3 overflow-hidden"
                >
                  {Location.map((item) => (
                    <div className="flex gap-3 p-2" key={item}>
                      <input
                        type="checkbox"
                        id={item}
                        name={item}
                        className="accent-green-900"
                      />
                      <label htmlFor={item}>{item}</label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-4 mt-4">
        {GroupData.map((data, index) => {
          const progress = Math.round((data.slotTaken / data.slot) * 100);
          return (
            <div key={index}>
              <div className="p-3 bg-white">
                <div className="bg-gray-200 rounded-md flex flex-col items-center justify-center p-2">
                  <div
                    className={`w-auto rounded-full ml-53 ${getStatusClasses(
                      data.status
                    )}`}
                  >
                    <p className="text-sm py-1 px-3">
                      {getStatusText(data.status)}!
                    </p>
                  </div>
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-45 h-45 object-contain"
                  />
                </div>
                <div className="pt-3">
                  <div className="space-y-3">
                    <p>{data.name}</p>
                    <p>{data.location}</p>
                    <div className="flex items-center justify-between w-full ">
                      <p>{data.price}</p>
                      <p>per box</p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p>Progress</p>
                      <p>
                        {data.slotTaken}/{data.slot} slots
                      </p>
                    </div>

                    <div>
                      <div
                        className="bg-[#016130] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p>{data.slot - data.slotTaken} slots remaining</p>
                    <Link to={`/group-buy/${data.id}`}>
                      <button className="w-full bg-[#016130] hover:bg-[#003F1F] text-white inline-flex items-center justify-center rounded-lg mt-3 py-2 font-medium transition-colors focus:outline-none">
                        View Details & Join
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupCreation;
