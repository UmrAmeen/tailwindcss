export default function CategoryCard({ row }: any) {
  return (
    <div className="flex flex-col  border-[5px]  w-[250px] p-[15px] m-[10px] rounded-[10px] bg-green-400">
      <img className="h-50 p-1 object-cover" src={row.base64Image} />
      <p className="text-gray-900 font-bold text-[20px]">{row.name}</p>
    </div>
  );
}
``