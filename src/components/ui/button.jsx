export function Button({ children, onClick, variant }) {
  const styles = {
    base: "px-4 py-2 rounded text-white font-medium",
    default: "bg-blue-600 hover:bg-blue-700",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
  };

  const variantClass = variant === "outline" ? styles.outline : styles.default;

  return (
    <button onClick={onClick} className={`${styles.base} ${variantClass}`}>
      {children}
    </button>
  );
}