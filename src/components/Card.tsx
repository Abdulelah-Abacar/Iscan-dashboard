export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-[#f0f0f0] p-6 rounded-[2.5rem] ${className}`}>
      {children}
    </div>
  );
};
