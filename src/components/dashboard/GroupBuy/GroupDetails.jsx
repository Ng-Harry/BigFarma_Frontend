import React from "react";
import { useParams } from "react-router-dom";
import { GroupData } from "@/lib/GroupBuy";
import { Shield } from "lucide-react";
import { getStatusText, getStatusClasses } from "@/utils/GroupBuyStatus";
import { Link } from "react-router-dom";

const GroupDetails = () => {
  const { id } = useParams();
  // const group = GroupData[parseInt(id)]
  const group = GroupData.find((item) => String(item.id) === id);
  if (!group) return <p>Group Not Found</p>;
  const progress = Math.round((group.slotTaken / group.slot) * 100);
  const Escrow = 16000;
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-full col-span-2 p-2 px-5 space-y-3 rounded-md shadow-[0_0_4px_0_rgba(0,0,0,0.25)] ">
        <div className="flex gap-4">
          <span>
            <Shield />
          </span>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-xl">Escrow Protection:</p>
            <p>₦{Escrow} held in escrow until group is complete or expired</p>
          </div>
        </div>
      </div>

      <div className="py-3 px-5 rounded-md shadow-[0_0_4px_0_rgba(0,0,0,0.25)] mt-4">
        <div className="p-2">
          <div className="bg-gray-200 rounded-md flex flex-col items-center justify-center p-2">
            <div
              className={`w-auto rounded-full ml-53 ${getStatusClasses(
                group.status
              )}`}
            >
              <p className="text-sm py-1 px-3">
                {getStatusText(group.status)}!
              </p>
            </div>
            <img
              src={group.image}
              alt={group.name}
              className="w-45 h-45 object-contain"
            />
          </div>
          <div className="pt-3">
            <div className="space-y-3">
              <p>{group.name}</p>
              <p>{group.location}</p>
              <div className="flex items-center justify-between w-full ">
                <p>{group.price}</p>
                <p>per box</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Progress</p>
                <p>
                  {group.slotTaken}/{group.slot} slots
                </p>
              </div>

              <div>
                <div
                  className="bg-[#016130] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p>{group.slot - group.slotTaken} slots remaining</p>
              <Link to={`/group-buy/${group.id}`}>
                <button className="w-full bg-[#016130] hover:bg-[#003F1F] text-white inline-flex items-center justify-center rounded-lg mt-3 py-2 font-medium transition-colors focus:outline-none">
                  View Details & Join
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 px-5 rounded-md shadow-[0_0_4px_0_rgba(0,0,0,0.25)] mt-4">
        <div className="p-2">
          <h3>Group Details</h3>

          <div>
            <p>Group ID: BGRP - {String(Number(group.id)).padStart(3, "0")} | Total Slots: {group.slot} | Escrow Amount: ₦{Number(Escrow).toLocaleString()}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
