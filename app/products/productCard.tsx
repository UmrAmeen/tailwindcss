export default function ProductCard({ row }: any) {
  return (
    <div className="flex flex-col  border-[5px]  w-[250px] p-[15px] m-[10px] rounded-[5px] bg-sky-400">
      <img className="h-50 p-1 object-cover" src={row.base64Image} />
      <p className="text-red-900 text-[20px]">{row.name}</p>
      <p className="text-black text-[20px]">{row.price}</p>
    </div>
  );
}
