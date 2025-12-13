import { SquarePen } from "lucide-react";

export function Main() {
  return (
    <div className="text-white flex flex-col gap-6 h-full text-xl">
      <div className="flex flex-col gap-6">
        <div className="flex bg-[#1f1f1f] w-full justify-between items-center p-6 rounded-xl text-white ">
          <p className="font-medium">Name of the topic</p>
          <SquarePen className="hover:text-focused cursor-pointer" />
        </div>
        <div className="bg-[#1f1f1f] p-6 flex flex-col gap-5 rounded-xl">
          <div className="flex  w-full justify-between rounded-xl items-center text-white">
            <p className="font-medium">Description</p>
          </div>
          <div>
            <p>
              I’m looking for recent research updates on TCP/IP, especially
              papers that examine modern congestion-control methods, emerging
              security challenges, and protocol performance on high-bandwidth or
              variable-latency networks. I want concise summaries that highlight
              key findings, practical implications, and how these studies
              compare traditional TCP variants like CUBIC with newer approaches
              such as BBR and multipath extensions.
            </p>
          </div>
        </div>
      </div>
      <div className=" h-5/11 flex justify-center gap-6">
        <div className="w-full flex flex-col gap-6">
          <div className="bg-linear-45 from-[#92adff30]  to-[#1f1f1f50] rounded-xl w-full px-6 py-5 flex flex-col  gap-3">
            <p className="text-sm">Last Letter Sent</p>
            <p className="text-2xl font-medium ">10 December, 25</p>
          </div>
          <div className=" rounded-xl h-full w-full px-6 py-5  leading-10 font-medium flex flex-col  bg-linear-45 from-[#1f1f1f50]  to-[#92adff30] gap-3">
            <p className="text-sm">Model Used</p>
            <div>
              <div className="flex justify-start">
                <p className="font-bold bg-linear-to-r from-orange-400 via-orange-700 to-red-500 text-transparent bg-clip-text text-2xl">
                  Mistral Large 3
                </p>
              </div>
              <p className="pe-6">
                Mistral Large 3, is a state-of-the-art, open-weight,
                general-purpose multimodal model with a granular
                Mixture-of-Experts architecture. It features 41B active
                parameters and 675B total parameters.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          <div className="bg-linear-45 from-[#92adff30]  to-[#1f1f1f50] rounded-xl w-full px-6 py-5 h-full text-2xl flex flex-col gap-3">
            <p className="text-sm">Upcoming Updates</p>
            <div></div>
          </div>
          <div className="text-2xl rounded-xl w-full px-6 py-5 bg-linear-45 from-[#1f1f1f50]  to-[#92adff30] flex flex-col gap-3">
            <p className="text-sm">Due Charge</p>
            <p>$3</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button className="bg-focused hover:bg-hover-focused text-zinc-900 font-medium flex justify-center gap-4 px-7 py-4 cursor-pointer rounded-full text-xl items-center">
          Edit topic <SquarePen />
        </button>
      </div>
    </div>
  );
}
