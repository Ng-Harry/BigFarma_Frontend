import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Orders = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const lineData = [10000, 50000, 100000, 500000, 1000000, 5000000];

const LineChart = () => {
  const data = {
    labels: Orders,
    datasets: [
      {
        label: "Orders",
        data: lineData,
        borderColor: "#016130",
        backgroundColor: "#016130",
        fill: false,
        tension: 0.4,
        pointStyle: "circle",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "right",
        align: "center",
        labels: {
          color: "#000000",
          padding: 20,
          boxWidth: 30,
          usePointStyle: true,
          font: {
            weight: 700,
            size: 18, 
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#000000", 
          font: {
            weight: 700,
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: false,
        min: lineData[0],
        ticks: {
          maxTicksLimit: 6,
          color: "#000000", 
          font: {
            weight: 700,
            size: 14,
          },
          callback: function (value) {
            return `#${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return React.createElement(
    "div",
    { className: "w-full h-[300px]" },
    React.createElement(Line, { data, options })
  );
};

export default LineChart;