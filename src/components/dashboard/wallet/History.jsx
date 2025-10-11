// import React from "react";
// import { ArrowBigDown, List, Download } from "lucide-react";
// import {
//   getStatusClasses,
//   getStatusText,
//   getIconClasses,
//   getIconColor,
//   getIconBg,
//   getTextColor,
// } from "../../../utils/TransactionStatus";
// // import { transactions } from "../../../lib/Transaction";
// import { walletApi } from "../../../lib/walletApi";
// import { useQuery } from "@tanstack/react-query";
// const History = () => {
//   const {
//     data: walletData,
//     isLoading,
//     isError,
//     // refetch,
//   } = useQuery({
//     queryKey: ["walletDashboard"],
//     queryFn: walletApi,
//     refetchOnWindowFocus: false, // disable auto refresh when switching tabs
//   });


//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-32 text-gray-500">
//         <p>Loading transactions...</p>
//       </div>
//     );
//   }

//   if (isError || !walletData) {
//     return (
//       <div className="flex flex-col items-center justify-center h-32 text-gray-500">
//         <p>Failed to load transactions</p>
//       </div>
//     );
//   }
//     const transactions = walletData.recent_transactions || [];
//   return (
//     <>
//       <div className="w-full h-auto bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] p-4 rounded-lg">
//         <h2 className="text-lg font-semibold mb-4 text-left">
//           Transaction History
//         </h2>

//         {transactions.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-32 text-gray-500">
//             <ArrowBigDown size={40} strokeWidth={1} className="mb-2" />
//             <p>No transactions available</p>
//           </div>
//         ) : (
//           transactions.map((transaction, index) => {
//             const Icon = getIconClasses(transaction.transactionStatus);
//             const iconColor = getIconColor(transaction.transactionStatus);
//             const iconBg = getIconBg(transaction.transactionStatus);
//             const statusClass = getStatusClasses(transaction.status);
//             const statusText = getStatusText(transaction.status);
//             const StatusIcon = getIconClasses(transaction.status);

//             return (
//               <div
//                 key={index}
//                 className="border border-gray-300 shadow-md rounded-lg p-3 flex items-center justify-between mb-5"
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-3 rounded-full flex items-center justify-center `}
//                     style={{ backgroundColor: iconBg }}
//                   >
//                     {Icon && (
//                       <Icon size={25} strokeWidth={1.5} color={iconColor} />
//                     )}
//                   </div>
//                   <div className="flex flex-col items-start justify-center gap-1">
//                     <p>{transaction.name}</p>
//                     <p className="text-sm text-gray-500">{transaction.date}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <p
//                     className="font-semibold"
//                     style={{ color: getTextColor(transaction.status) }}
//                   >
//                     #{" "} {transaction.amount.toLocaleString()}
//                   </p>
//                   <div
//                     className={`text-xs font-medium px-5 py-1 rounded-full flex items-center gap-1 ${statusClass}`}
//                   >
//                     {StatusIcon && (
//                       <StatusIcon
//                         size={14}
//                         strokeWidth={1.5}
//                         className={iconBg}
//                       />
//                     )}
//                     <span>{statusText}</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </>
//   );
// };

// export default History;

import React from "react";
import { ArrowBigDown } from "lucide-react";
import {
  getStatusClasses,
  getStatusText,
  getIconClasses,
  getIconColor,
  getIconBg,
  getTextColor,
} from "../../../utils/TransactionStatus";
import { transactions as dummyTransactions } from "../../../lib/Transaction";
import { walletApi } from "../../../lib/walletApi";
import { useQuery } from "@tanstack/react-query";

const History = () => {
  const {
    data: walletData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["walletDashboard"],
    queryFn: walletApi,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-gray-500">
        <p>Loading transactions...</p>
      </div>
    );
  }

  if (isError || !walletData) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-gray-500">
        <p>Failed to load transactions</p>
      </div>
    );
  }

    const apiTransactions = walletData?.recent_transactions || [];
  const allTransactions = [...dummyTransactions, ...apiTransactions];


  return (
    <div className="w-full h-auto bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-left">
        Transaction History
      </h2>

      {allTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <ArrowBigDown size={40} strokeWidth={1} className="mb-2" />
          <p>No transactions available</p>
        </div>
      ) : (
        allTransactions.map((transaction, index) => {
          const Icon = getIconClasses(transaction.status);
          const iconColor = getIconColor(transaction.status);
          const iconBg = getIconBg(transaction.status);
          const statusClass = getStatusClasses(transaction.status);
          const statusText = getStatusText(transaction.status);

          return (
            <div
              key={index}
              className="border border-gray-300 shadow-md rounded-lg p-3 flex items-center justify-between mb-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-full flex items-center justify-center`}
                  style={{ backgroundColor: iconBg }}
                >
                  {Icon && <Icon size={25} strokeWidth={1.5} color={iconColor} />}
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                  <p>{transaction.description || transaction.category}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <p
                  className="font-semibold"
                  style={{ color: getTextColor(transaction.status) }}
                >
                  ₦{transaction.amount.toLocaleString()}
                </p>
                <div
                  className={`text-xs font-medium px-5 py-1 rounded-full flex items-center gap-1 ${statusClass}`}
                >
                  <span>{statusText}</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default History;
