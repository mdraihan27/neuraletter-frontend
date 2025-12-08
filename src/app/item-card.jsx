import { brain } from "lucide-react";

export function ItemCard({ ItemIcon, text }) {
  return (
    <div className="bg-linear-to-br from-[#92adff30] via-[#92adff10] to-transparent backdrop-blur-2xl text-white  rounded-2xl p-8 flex items-center gap-6">
      <ItemIcon className="w-[30px] h-[30px]" />
      <div className=" bg-linear-to-br from-white via-white to-transparent text-transparent bg-clip-text">
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
}
