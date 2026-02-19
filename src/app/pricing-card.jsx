import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

export function PricingCard({ planName, price, features, comment }) {
  return (
    <div className="p-6 sm:p-8 flex flex-col text-white bg-linear-to-br from-[#92adff30] via-[#92adff10] to-transparent backdrop-blur-2xl rounded-2xl w-full max-w-[360px] min-h-[400px] sm:min-h-[450px] lg:h-[530px] justify-between z-10">
      <div className="flex flex-col gap-3">
        <h3 className="text-focused font-semibold text-xl sm:text-2xl">{planName}</h3>
        <div className="flex items-baseline">
          <p className="text-4xl sm:text-5xl font-semibold">${price}</p>
          <p className="">/month</p>
        </div>
        <p className="text-sm sm:text-base">{comment}</p>
        <div>
          {features.map((feature, i) => (
            <div key={i} className="flex gap-3 sm:gap-4 mt-3 sm:mt-4">
              <CircleCheckBig className="text-focused font-semibold shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
              <p className="text-focused text-sm sm:text-base">{feature}</p>
            </div>
          ))}
        </div>
      </div>
      <Link href="/register" className="flex justify-center">
        <button className="text-slate-900 mx-auto w-full max-w-[290px] h-[46px] sm:h-[50px] bg-linear-to-b from-[#92adff] to-[#92adff70] rounded-xl mt-6 lg:mt-0 cursor-pointer font-medium">
          Get Started
        </button>
      </Link>
    </div>
  );
}
