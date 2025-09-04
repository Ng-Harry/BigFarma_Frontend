// import React from "react";

// const quickLinks = [
//   { label: "Marketplace", href: "" },
//   { label: "Start New Investment", href: "" },
//   { label: "Track Order", href: "" },
//   { label: "Join Group Buy", href: "" },
// ];

// const QuickLinks = () => {
//   return (
//     <section className="space-y-5">
//       <div className="border-2 border-grey-100 rounded-lg p-5">
//         <p className="font-semibold text-2xl">Quick Links</p>
//         <div className="mt-7">
//           <ul className="space-y-1.5">
//             {quickLinks.map(({ href, label }) => (
//               <li key={label}>
//                 <a
//                   href={href}
//                   className="text-primary hover:text-primary-light duration-300 ease-in-out transition-colors font-medium px-5 py-4 block"
//                 >
//                   {label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="border-2 border-grey-100 rounded-lg p-5">
//         <p className="font-semibold text-2xl">Active Group Buys</p>
//         <div className="mt-7 space-y-2.5">
//           <p className="font-medium px-5 py-4 border-b-2 border-grey-100 rounded-lg">
//             Bisi Farm: 1 Bag of Rice -{" "}
//             <span className="text-red-500">Processing</span>
//           </p>
//           <p className="font-medium px-5 py-4 border-b-2 border-grey-100 rounded-lg">
//             Simi Farm: 1 bag of Tomatoes -{" "}
//             <span className="text-primary-light">Completed</span>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default QuickLinks;
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#016130", "#3FDC7E",  "#FF8400", "#FFA725"];
const LABELS = ["Onions", "Tomatoes", "Pepper","Plantain"];

const Chart = () => {
  const chartData = [40, 25, 20, 15];

  const data = {
    labels: LABELS,
    datasets: [
      {
        label: "Dataset",
        data: chartData,
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "50%",
    aspectRatio: 1,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          padding:20,
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            weight: 700,
            size: 18,
          },
            color: "#000000",
        },
      },
    },
  };

  return React.createElement(
    "div",
    { className: "w-[300px] max-w-[300px] h-[300px]" },
    React.createElement(Doughnut, { data, options })
  );
};

export default Chart;
