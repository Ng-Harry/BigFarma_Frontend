import { useEffect, useState } from "react";
import CardSkeleton from "./CardSkeleton";
import StatCard from "./StatCard";

const Statistics = () => {
  const [isLoading, setIsLoading] = useState(true);

  const statisticsData = {
    statisticsArray: [
      { title: "Total Investments", total: 1200000, percentage: 5 },
      { title: "Current Orders", total: 4, percentage: -5 },
      { title: "ROI", total: 10000, percentage: 8 },
    ],
    intervals: [],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {isLoading
        ? [...Array(3)].map((_, index) => <CardSkeleton key={index} />)
        : statisticsData.statisticsArray.map(({ title, total, percentage }) => (
            <StatCard
              key={title}
              title={title}
              total={total}
              percentage={percentage}
            />
          ))}
    </div>
  );
};

export default Statistics;
