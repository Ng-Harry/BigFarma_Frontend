export const formatAmount = (num) => {
  if (typeof num !== "number" || isNaN(num)) return "0";

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
