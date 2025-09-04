import Chart from "./Doughnut";

const DoughnutChart = () => {
  return (
    <div className="border-2 border-grey-100 rounded-lg p-5">
      <h4 className="font-semibold text-2xl">Investment Portfolio</h4>

      <div className="mt-5 relative flex">
        <Chart />
      <div className="w-[200px]"></div>
      </div>
    </div>
  );
};

export default DoughnutChart;
