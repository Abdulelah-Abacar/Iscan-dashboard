import { Verified } from "lucide-react";

export const VerifiedIcon = ({
    fill,
    size,
    stroke,
    className,
    onClick,
    isSelected,
  }) => {
    return (
      <div
        onClick={onClick}
        className={`${className} ${
          isSelected ? "border-4 border-black" : ""
        } cursor-pointer`}
      >
        <Verified fill={fill} size={size} stroke={stroke} />
      </div>
    );
  };