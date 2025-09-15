import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#016130", "#FFA725", "#FF8400"];
const LABELS = ["Vegetables", "Livestock", "Grain"];

const Chart = () => {
  const chartData = [50, 30, 20]; 

  const data = {
    labels: LABELS,
    datasets: [
      {
        label: "Dataset",
        data: chartData,
        borderRadius: 10,
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "80%",
    aspectRatio: 1,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          padding: 20,
          boxWidth: 30,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            weight: 500,
          },
        },
      },
    },
  };

  return React.createElement(
    "div",
    { className: "w-full h-[300px]" },
    React.createElement(Doughnut, { data, options })
  );
};

export default Chart;
