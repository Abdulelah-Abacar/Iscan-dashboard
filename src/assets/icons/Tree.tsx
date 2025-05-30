import React from "react";

function Tree({ className, color }) {
  return (
    <svg
      fill={color}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8,17h3v4H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2H13V17h3a5,5,0,0,0,1-9.9V6A5,5,0,0,0,7,6V7.1A5,5,0,0,0,8,17ZM8,9A1,1,0,0,0,9,8V6a3,3,0,0,1,6,0V8a1,1,0,0,0,1,1,3,3,0,0,1,0,6H13v-.586l2.707-2.707a1,1,0,0,0-1.414-1.414L13,11.586V9a1,1,0,0,0-2,0v2.586L9.707,10.293a1,1,0,0,0-1.414,1.414L11,14.414V15H8A3,3,0,0,1,8,9Z" />
    </svg>
  );
}

export default Tree;
