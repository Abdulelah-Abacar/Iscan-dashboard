export const SectionTitle = ({ title, underlinedPart, fullWidth = false }) => {
  if (underlinedPart) {
    return (
      <h3 className="text-lg">
        <span className="border-b-2 border-black pb-1">{underlinedPart}</span>{" "}
        {title}
      </h3>
    );
  }

  return (
    <h3
      className={`text-lg ${fullWidth ? "w-full" : ""} ${
        fullWidth ? "" : "border-b-2 border-black pb-1"
      }`}
    >
      {title}
    </h3>
  );
};
