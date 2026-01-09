interface SubtitleProps {
  text: string;
  size?: "lg" | "md" | "sm";
  align?: "left" | "center";
}

const sizeClasses = {
  lg: "text-2xl sm:text-3xl",
  md: "text-xl sm:text-2xl",
  sm: "text-lg sm:text-xl"
};

const Subtitle: React.FC<SubtitleProps> = ({
  text,
  size = "md",
  align = "left"
}) => {
  return (
    <h2
      className={`
        font-semibold
        text-gray-800
        ${sizeClasses[size]}
        ${align === "center" ? "text-center" : "text-left"}
      `}
    >
      {text}
    </h2>
  );
};

export default Subtitle;
