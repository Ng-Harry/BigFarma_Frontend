import { useEffect, useState } from "react";
import CardSkeleton from "./CardSkeleton";
import StatCard from "./StatCard";

const Statistics = () => {
  const [isLoading, setIsLoading] = useState(true);

  const statisticsData = {
    statisticsArray: [
      { title: "Today’s Revenue", total: 200000, percentage: 6.0 },
      { title: "Total Revenue", total: 5000000, percentage: 4.1  },
      { title: "Product Sold", total: 720, percentage: 10 },
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
