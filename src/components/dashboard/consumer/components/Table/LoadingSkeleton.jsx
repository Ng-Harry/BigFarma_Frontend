import { Skeleton } from "@/components/shared";

const LoadingSkeleton = ({ itemKey }) => {
  return (
    <tr
      key={itemKey}
      className="table-row cursor-pointer text-sm *:px-4 lg:*:px-6 *:py-2 lg:*:py-6 lg:py-0 border-b border-t border-l border-r border-grey-200 bg-white"
    >
      <td className="flex items-center gap-1">
        <Skeleton className="w-5 h-5 rounded" />
        <Skeleton className="w-12 h-5 rounded" />
      </td>
      <td>
        <Skeleton className="w-24 h-5 rounded" />
      </td>
      <td>
        <Skeleton className="w-20 h-5 rounded" />
      </td>
      <td>
        <Skeleton className="w-20 h-5 rounded" />
      </td>
    </tr>
  );
};

export default LoadingSkeleton;
