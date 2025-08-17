
export default function Card({ children, className = "", ...props }) {
  return (
    <div className={`rounded-xl shadow-sm bg-white border-none ${className}`} {...props}>
      {children}
    </div>
  );
}
