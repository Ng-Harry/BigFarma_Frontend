import React from "react";
import { History, List, Download } from "lucide-react";
import WithdrawModal from "./WithdrawModal";
const items = [
    {icon: Download,   label: "Withdraw",},
    {icon: History,     label: "History",},
    {icon: List,  label: "Account Details",},
]
const QuickActions = () => {
  const [withdrawModalOpen, setWithdrawModalOpen] = React.useState(false);

  const openWithdrawModal = (label) => {
    if (label === "Withdraw") {
      setWithdrawModalOpen(true);
    }
  };


  return (
    <div className="w-full h-43 bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] p-4 rounded-lg">
      <p className="text-left">QuickActions</p>

      <div className="mt-5 grid grid-cols-3 place-items-center lg:gap-7">

       { items.map((item, index) => {
         const Icon = item.icon;
            return (
            <div key={index} onClick={() => openWithdrawModal(item.label)} className="flex items-center justify-center  w-42 h-22 border border-[#016130] rounded-2xl cursor-pointer">
               <div className="flex flex-col items-center justify-center gap-2">
                 <div className="p-2 bg-[#C9F4DE] rounded-full">
                    <Icon size={22} strokeWidth={2.5} className="text-[#016130]" />
                 </div>
                <p className="text-center text-sm">{item.label}</p>
               </div>
            </div>
            );
       } )}
      </div>

      {withdrawModalOpen && (
        <WithdrawModal isOpen={withdrawModalOpen} onClose={() => setWithdrawModalOpen(false)} />
      )}
    </div>
  );
};

export default QuickActions;
