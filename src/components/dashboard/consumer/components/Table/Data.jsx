import { getStatusClasses, getStatusText } from "@/utils";

const Data = ({ props, isChecked, onToggle }) => {
  const { id, farmName, date, status } = props;

  return (
    <>
      <td>
        <div className="flex items-center gap-2">
          <input
            checked={isChecked}
            onClick={(e) => {
              e.stopPropagation();
              onToggle && onToggle();
            }}
            type="checkbox"
            className="accent-primary w-5 h-5"
          />
          <p>#{id}</p>
        </div>
      </td>
      <td>{farmName}</td>
      <td>{date}</td>
      <td>
        <p
          className={`py-2.5 px-4 rounded-md w-fit ${getStatusClasses(status)}`}
        >
          {getStatusText(status)}
        </p>
      </td>
    </>
  );
};

export default Data;
