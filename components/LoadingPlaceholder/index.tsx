export default function LoadingPlaceholder({
  width = "100%",
  height = "20px",
  className = "",
}) {
  return (
    <div
      className={`bg-gray-300 animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );
}
