import { brain } from "lucide-react";

export function ItemCard({ ItemIcon, text }) {
  return (
    <div className="bg-linear-to-br from-[#92adff30] via-[#92adff10] to-transparent backdrop-blur-2xl text-white rounded-2xl p-5 sm:p-6 lg:p-8 flex items-center gap-4 sm:gap-5 lg:gap-6 w-full">
      <ItemIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px] shrink-0" />
      <div className="bg-linear-to-br from-white via-white to-transparent text-transparent bg-clip-text">
        <p className="text-base sm:text-lg">{text}</p>
      </div>
    </div>
  );
}
