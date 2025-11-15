import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { EmailSkeleton } from "@/components/layout/email-skeleton";
import TypingText from "@/components/ui/shadcn-io/typing-text/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

import Image from "next/image";

export default function Home() {
  return (
    <AuroraBackground className="bg-black">
      <div className="relative h-screen w-full overflow-y-auto hide-scrollbar-y">
        <main className="w-dvw flex justify-center items-center flex-col">
          <h1 className="text-[66px] max-w-7xl text-center font-bold text-primary mt-40 leading-20">
            Join <span className="text-focused">NeuraLetter</span> to experience{" "}
            <br></br>a more insightful
            <span className="text-focused">{" "}NewsLetter</span>
          </h1>
          <h2 className="text-3xl font-medium mt-6 bg-linear-to-r from-[#9fb7ff] via-[#ffffff] to-[#c4b4ff] bg-clip-text text-transparent">
            Powered by AI
          </h2>

          <ShimmerButton className="mt-28 flex gap-1 text-sm font-extralilght ps-[30px]">
            Try Now{" "}
            <Image
              src="/images/icons/arrow_forward.svg"
              alt=""
              width={18}
              height={18}
            />
          </ShimmerButton>

          <img
            src="/images/icons/arrow_downward.svg"
            alt="Scroll down"
            width={24}
            height={24}
            className="mt-40 "
          />
        </main>

        <section className="mt-44">
          <h2 className="text-white text-center font-bold text-4xl ">
            What's <span className="text-focused font-bold">NeuraLetter</span> ?
          </h2>
          <div className="flex justify-center gap-10 items-center mt-20">
            <div className="flex flex-col gap-8 max-w-[400px] text-white text-[50px] font-bold text-right"></div>

            <EmailSkeleton className=""></EmailSkeleton>

            <div className="flex flex-col gap-8 max-w-[400px] text-white text-[23px] font-light text-left">
              <p>
                <span className="text-focused font-bold">Any update</span> of
                your topic of interest would be{" "}
                <span className="text-focused font-bold">mailed to you</span>
                <br></br> in your chosen frequency. <br></br>
                <br></br>Using{" "}
                <span className="text-focused font-bold">
                  state of the art<br></br> web searching,
                </span>
                <br></br>AI will ensure you don't miss anything.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-44 w-full flex flex-col items-center">
          <h className="text-white text-center w-full text-4xl font-bold">
            Why
            <span className="text-focused"> waste time on researching</span>
            <br></br>updates of your interest?
          </h>
          <p className="text-white text-xl mt-12">
            When you can just{" "}
            <span className="text-focused font-bold ">
              ask AI to send it to you regularly
            </span>
          </p>

          <div className="border border-focused bg-[#18181885] h-[250px] w-[800px] rounded-3xl mt-5">
            <div className="flex flex-col justify-between h-[230px]">
              <TypingText
                text={[
                  "Latest research papers on Transformers, model and Neural networks",
                  "Satellite Imagery Analysis, Military Movements, and Territorial Changes in Ongoing Conflicts in Eastern Europe and the Middle East",
                  "AI Regulation Developments, Open-Source Model Leaks, Ethical AI Frameworks, and Corporate AI Strategy Announcements",
                  "Innovations in Renewable Energy Storage, Battery Technology Advances, Green Hydrogen Projects, and International Energy Policy Shifts",
                ]}
                typingSpeed={125}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="bg-white ms-2 h-[20px]"
                className="text-xl px-12 mt-8"
                textColors={["gray"]}
                variableSpeed={{ min: 50, max: 120 }}
              ></TypingText>
              <div className="flex justify-between px-12 items-center ">
                <div className="w-[150px] h-[30px] flex items-center bg-[#202020] rounded-sm ">
                  <select
                    defaultValue=""
                    id="frequency"
                    name="frequency"
                    className="bg-[#202020] w-[140px] px-3 text-gray-400 rounded-full focus:outline-none focus:border-none border-none"
                  >
                    <option value="" disabled selected>
                      Frequency
                    </option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5 Days</option>
                    <option value="6">6 Days</option>
                    <option value="7">1 Week</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <button className="bg-focused text-black items-center rounded-[30px] flex justify-center gap-2 w-[130px] h-[50px] text-[18px] font-medium  ">
                  <p className="ms-[4px]">Apply</p>
                  <img
                    src="/images/icons/arrow_forward2.svg"
                    alt="Scroll down"
                    width={24}
                    height={24}
                    className="text-black invert"
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AuroraBackground>
  );
}
