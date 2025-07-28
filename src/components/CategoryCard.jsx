export default function CategoryCard({ title = "بدون عنوان", onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      className="w-full p-3 rounded bg-gray-100 text-center hover:bg-blue-100 transition duration-200 text-gray-800 font-medium"
    >
      {title}
    </button>
  );
}
