export const IconWithBackground = ({ icon, size = "normal" }) => {
  const sizeClasses = size === "small" ? "p-2" : "p-3";

  return <div className={`${sizeClasses} bg-white rounded-full`}>{icon}</div>;
};
