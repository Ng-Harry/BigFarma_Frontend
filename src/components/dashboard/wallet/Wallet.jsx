import React from "react";
import { Wallet, TrendingUp, Eye, EyeClosed } from "lucide-react";
import QuickActions from "./QuickActions";
import History from "./History.jsx";
import { walletApi } from "../../../lib/walletApi";
import { useQuery } from "@tanstack/react-query";

// const balance = 102500.78;
// const ledgerBalance = 118600.0;

const WalletDashboard = () => {
  const {
    data: walletData,
    isLoading,
    isError,
    // refetch,
  } = useQuery({
    queryKey: ["walletDashboard"],
    queryFn: walletApi,
  });

  const [isVisible, setIsVisible] = React.useState(true);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  if (isLoading) return <p>Loading wallet data...</p>;
  if (isError) return <p>Failed to load wallet info 😞</p>;
  if (!walletData) return null;

  // const { wallet, recent_transactions, total_earnings, total_withdrawals } =
  //   walletData;
  const { wallet } = walletData;
  return (
    <>
      <div className="w-full  bg-[#016130] p-5 rounded-lg  text-white">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Wallet size={35} strokeWidth={1} />
            <p className="text-xl font-semibold">Wallet Balance</p>
          </div>
          <span>
            <TrendingUp size={40} strokeWidth={1} />
          </span>
        </div>

        <div className="mt-5 flex items-start flex-col gap-2 ">
          <div className="flex items-center gap-3">
            <p className="text-2xl font-semibold">
              <span className="font-light pr-0.5">₦</span>
              {/* ₦{" "} */}
              {isVisible
                ? wallet.balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })
                : "*********"}
            </p>
            {isVisible ? (
              <Eye
                size={20}
                strokeWidth={2}
                className="cursor-pointer"
                onClick={toggleVisibility}
              />
            ) : (
              <EyeClosed
                size={20}
                strokeWidth={2}
                className="cursor-pointer"
                onClick={toggleVisibility}
              />
            )}
          </div>
          <div className="flex items-center  gap-1">
            <p>Ledger balance</p>
            <span>
              {wallet.ledger_balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <QuickActions />
      </div>
      <div className="mt-5 h-85 overflow-y-hidden">
        <History />
      </div>
    </>
  );
};

export default WalletDashboard;
