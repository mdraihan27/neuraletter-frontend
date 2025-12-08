import Image from "next/image";
import { ShineBorder } from "@/components/ui/imported/shine-border";

function SingleEmailSkeleton() {
  return (
    <div className="w-[360px] h-[40px] bg-gray-600 rounded-full mt-5 flex items-center opacity-30">
      <Image
        src="/images/icons/account_circle.svg"
        className="ms-1"
        alt=""
        width={32}
        height={32}
      />

      <div className="flex flex-col gap-1.5 ms-2">
        <div className="w-[70px] h-[5px] rounded-full bg-gray-500 flex items-center"></div>
        <div className="w-[300px] h-[5px] rounded-full bg-gray-500 flex items-center"></div>
      </div>
    </div>
  );
}

export function EmailSkeleton() {
  return (
    <div className="w-[400px] h-[520px]  rounded-xl flex flex-col items-center pb-5 relative overflow-hidden">
      <ShineBorder shineColor={"white"} />
      <p className="text-white mt-3 opacity-30 ">Mail</p>

      <div className="w-[360px] h-[26px] mt-2 rounded-full bg-gray-500 flex items-center opacity-30">
        <Image
          src="/images/icons/search.svg"
          className="ms-2"
          alt=""
          width={18}
          height={18}
        />
      </div>

      <div className="w-[360px] h-[60px] bg-gradient-to-tr from-gray-700 via-gray-600 to-gray-700 rounded-2xl mt-5 flex items-center border border-[#a2a2a2]">
        {/* <Image
          src="/images/icons/account_circle.svg"
          className="ms-1"
          alt=""
          width={32}
          height={32}
        /> */}

        <div className="flex flex-col ms-6 justify-center ">
          <p className="text-[15px] text-white fnt-bold">NeuraLetter</p>

          <p className="text-white text-[11px] font-extralight">
            This weeks publication list of networking papers
          </p>
        </div>
      </div>

      <SingleEmailSkeleton></SingleEmailSkeleton>
      <SingleEmailSkeleton></SingleEmailSkeleton>
      <SingleEmailSkeleton></SingleEmailSkeleton>
      <SingleEmailSkeleton></SingleEmailSkeleton>
      <SingleEmailSkeleton></SingleEmailSkeleton>
      <SingleEmailSkeleton></SingleEmailSkeleton>
    </div>
  );
}
