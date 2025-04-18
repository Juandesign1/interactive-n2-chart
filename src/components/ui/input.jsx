export function Input({ placeholder, onKeyDown }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onKeyDown={onKeyDown}
          className="border px-2 py-1 rounded w-full max-w-xs bg-white text-black placeholder:text-gray-500"
    />
  );
}