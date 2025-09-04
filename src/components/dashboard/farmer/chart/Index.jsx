import Line from "./LineChart";
import Doughnut from "./Doughnut";
import { ChevronDown } from "lucide-react";

const Charts = () => {
  return (
    <section className="grid grid-cols-[2fr_1fr] gap-6">
      <div className="border-2 border-grey-100 rounded-lg p-5 ">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-xl text-[#000000]">
            Revenue Generated
          </h4>
          <div className="w-fit cursor-pointer  rounded-md bg-[#EFEFEF] px-3 py-1.5 font-bold shadow-[0_0_4px_rgba(0,0,0,0.25)]">
            <span className="text-xs text-[#3C3C3C]">This week</span>
            <ChevronDown className="inline ml-2 h-4 w-4 text-[#3C3C3C]"  />
          </div>
        </div>

        <div className="mt-5 relative flex">
          <Line />
        </div>
      </div>

      <div className="border-2 border-grey-100 rounded-lg p-4">
        <div className="flex justify-between items-center ">
          <h4 className="font-semibold text-xl text-[#000000]">
            Best Selling Products
          </h4>
          <div className="w-fit cursor-pointer  rounded-md bg-[#EFEFEF] px-2 py-1.5 font-bold shadow-[0_0_4px_rgba(0,0,0,0.25)]">
            <span className="text-xs text-[#3C3C3C]">This week</span>
            <ChevronDown className="inline ml-2 h-4 w-4 text-[#3C3C3C]" />
          </div>
        </div>
        
        <div className="mt-5 relative flex items-center justify-center">
          <Doughnut />
        </div>
      </div>
    </section>
  );
};

export default Charts;
