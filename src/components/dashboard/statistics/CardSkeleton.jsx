import { Skeleton } from "../../shared";

const CardSkeleton = () => {
  return (
    <div className="bg-white text-black py-5 px-6 border-2 border-grey-100 rounded-lg">
      <Skeleton className="h-4 w-28 mb-3 rounded-md" />

      <Skeleton className="h-8 w-40 mb-3 rounded-md" />

      <div className="flex items-center space-x-2">
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-3 w-16 rounded-md" />
      </div>
    </div>
  );
};

export default CardSkeleton;
