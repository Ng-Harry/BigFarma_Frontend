import React from "react";
import Input from "../../shared/Input";
import { Plus, Search, MapPin } from "lucide-react";
import Cube from "../../../assets/icons/cube.png";
import Group from "../../../assets/icons/group.png";
import { GroupData } from "@/lib/GroupBuy";
import {
  getStatusText,
  getStatusClasses,
  getDotClasses,
} from "@/utils/GroupBuyStatus";
import { Link } from "react-router-dom";

// Chunk data into 4 rows
const chunkArray = (arr, size) => {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
};

const groupedData = chunkArray(GroupData, 4);

const GroupCreation = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-col justify-center space-y-2 gap-2">
        <div className="flex justify-between items-center p-2">
          <div className="space-y-2">
            <h2 className="font-bold text-2xl">Group Buys</h2>
            <p>Join or create group purchases to save money on bulk orders</p>
          </div>
          <div>
            <Link to={"/group-buy/create"}>
              <button className="w-55 bg-[#016130] hover:bg-[#003F1F] inline-flex items-center justify-center gap-[3px] rounded-[8px] py-3 font-medium transition-colors focus:outline-none text-white">
                <Plus />
                Create Group
              </button>
            </Link>
          </div>
        </div>
        <div className="w-115 h-15 flex items-center relative">
          <Search className="text-[#98A2B3] absolute top-5 left-3 w-5 h-5" />
          <Input
            placeholder="Search for existing groups"
            className="pl-12 font-medium placeholder:text-[#98A2B3]"
          />
        </div>
      </div>
      <div className="w-full  space-y-6 p-4">
        {groupedData.map((row, rowIndex) => (
          <div key={rowIndex} className="w-full overflow-x-auto scroll-hide">
            <div className="w-max flex gap-6">
              {row.map((data, dataIndex) => {
                const percent = Math.max(
                  0,
                  Math.min(
                    100,
                    Math.round(((data.total || 0) / (data.unit || 1)) * 100)
                  )
                );
                return (
                  <div
                    key={`${rowIndex}-${dataIndex}`}
                    className="w-80 shadow-xl rounded-xl bg-white p-4 flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{data.name}</p>
                      <div
                        className={`w-auto px-2 py-1 flex items-center gap-2 rounded-2xl ${getStatusClasses(
                          data.status
                        )}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${getDotClasses(
                            data.status
                          )}`}
                        ></span>
                        <p className="text-sm">{getStatusText(data.status)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <p>{data.location}</p>
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                      <div className="flex items-center gap-3">
                        <div className="flex  gap-1">
                          <img src={Cube} alt="cube" className="w-5 h-5" />
                          <img src={Cube} alt="cube" className="w-5 h-5" />
                        </div>
                        <p className="font-medium">{data.product}</p>
                      </div>

                      <p className="text-sm text-gray-500">
                        {data.total} of {data.unit}kg
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="w-full h-3 bg-gray-200 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-[#016130]"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <span className="flex justify-end text-sm font-medium">
                        {percent}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={Group} alt="group" className="w-6 h-6" />
                        <span className="text-sm">{data.member} Members</span>
                      </div>
                      <p className="text-[#016130] font-bold text-sm">
                        N{Number(data.target || 0).toLocaleString()} target
                      </p>
                    </div>

                    <p className="text-[#6B7280] text-sm">{data.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupCreation;
