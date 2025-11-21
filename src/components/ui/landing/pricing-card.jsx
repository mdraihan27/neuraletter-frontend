import { CircleCheckBig } from "lucide-react";

export function PricingCard({ planName, price, features, comment }) {
  return (
    <div className="p-8 flex flex-col text-white bg-linear-to-br from-[#92adff30] via-[#92adff10] to-transparent backdrop-blur-2xl rounded-2xl w-[360px] h-[530px]  justify-between">
      <div className="flex flex-col gap-3">
        <h3 className="text-focused font-semibold text-2xl">{planName}</h3>
        <div className="flex items-baseline">
          <p className="text-5xl font-semibold ">{price}$</p>
          <p className="">/month</p>
        </div>
        <p>{comment}</p>
        <div>
          {features.map((feature, i) => (
            <div key={i} className="flex gap-4 mt-4">
              <CircleCheckBig className="text-focused font-semibold" />
              <p className="text-focused ">{feature}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="mx-auto w-[290px] h-[50px] bg-linear-to-b from-[#92adff] to-[#92adff70] rounded-xl">
        {" "}
        Get Started
      </button>
    </div>
  );
}
