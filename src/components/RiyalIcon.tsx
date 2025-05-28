import Image from "next/image";

export const RiyalIcon = ({ size = 32 }) => (
  <Image
    src="/Saudi_Riyal.png"
    alt="Riyal"
    width={size}
    height={size}
    className={`w-${size / 4} h-${size / 4}`}
  />
);
