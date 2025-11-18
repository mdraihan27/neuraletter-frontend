"use client";
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
import { GradientText } from "@/components/ui/shadcn-io/gradient-text";
import { Nav } from "@/components/ui/nav";
import { DemoEmail } from "@/components/ui/landing/demo-email";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);
  return (
    <AuroraBackground className="bg-black">
      <Nav
        navItems={[
          { id: "home", navItemName: "Home", redirectLink: "" },
          { id: "about", navItemName: "About", redirectLink: "" },
          { id: "features", navItemName: "Features", redirectLink: "" },
        ]}
        navButtons={[
          { id: "login", navButtonName: "Login", redirectLink: "" },
          { id: "try", navButtonName: "Try Now", redirectLink: "" },
        ]}
      ></Nav>
      <div className="relative h-screen w-full overflow-y-auto hide-scrollbar-y">
        <main className="w-dvw flex justify-center items-center flex-col">
          <h1 className="text-[74px] max-w-7xl text-center font-bold text-focused mt-28 leading-16">
            NeuraLetter
            {/* <GradientText
              text="Neuraletter"
              gradient="linear-gradient(90deg, #92adff 0%, white 50%, #92adff 80%)"
            />{" "} */}
          </h1>
          <h1 className="text-[74px] text-white font-bold ">
            Newsletter Redefined
          </h1>
          <h2 className="text-xl font-medium mt-3 bg-linear-to-r from-[#9fb7ff] via-[#ffffff] to-[#c4b4ff] bg-clip-text text-transparent">
            Powered by AI
          </h2>

          {/* <ShimmerButton className="mt-28 flex gap-1 text-sm font-extralilght ps-[30px]">
            Try Now{" "}
            <Image
              src="/images/icons/arrow_forward.svg"
              alt=""
              width={18}
              height={18}
            />
          </ShimmerButton> */}

          {/* <img
            src="/images/icons/arrow_downward.svg"
            alt="Scroll down"
            width={24}
            height={24}
            className="mt-40 "
          /> */}

          <h3 className="text-white text-center w-full text-xl  mt-20 ">
            Why
            <span className="text-focused font-bold">
              {" "}
              waste time on researching
            </span>
            <br></br>
            updates of your interest?
          </h3>

          <div className=" border-[#161616] border-4 bg-[#18181885] h-[230px] w-[700px] rounded-3xl mt-5 px-11 shadow-[inset_0_0_0_2px_#92adff20]">
            <textarea
              className="bg-[#ffffff0] w-[600px] h-[100px]  absolute  text-xl text-[#ffffff75] resize-none mt-[36px] focus:outline-none "
              autoFocus
              onChange={(e) => {
                setIsTyping(e.target.value.length > 0);
              }}
            ></textarea>
            <div className="flex flex-col justify-between h-[230px]">
              {!isTyping ? (
                <TypingText
                  text={[
                    "Latest research papers on Transformers, model and Neural networks",
                    "Satellite Imagery Analysis, Military Movements, and Territorial Changes in Ongoing Conflicts in Eastern Europe and the Middle East",
                    "AI Regulation Developments, Open-Source Model Leaks, Ethical AI Frameworks, and Corporate AI Strategy Announcements",
                    "Innovations in Renewable Energy Storage, Battery Technology Advances, Green Hydrogen Projects, and International Energy Policy Shifts",
                  ]}
                  id="typing_text_prompt"
                  typingSpeed={725}
                  pauseDuration={1500}
                  showCursor={false}
                  cursorCharacter="|"
                  cursorClassName="bg-white ms-2 h-[20px]"
                  className="text-xl  mt-9"
                  textColors={["#ffffff35"]}
                  variableSpeed={{ min: 10, max: 90 }}
                ></TypingText>
              ) : (
                <div></div>
              )}
              <div className="flex justify-between  items-center mb-7 ">
                <div className="w-[150px] h-[30px] flex items-center bg-[#202020] rounded-sm ">
                  <select
                    id="frequency"
                    name="frequency"
                    className="bg-[#202020] w-[140px] px-3 text-gray-400 rounded-full focus:outline-none focus:border-none border-none"
                    defaultValue="Frequency"
                  >
                   
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

                <Button className="bg-focused hover:bg-hover-focused text-black items-center rounded-[30px] flex justify-center gap-2 w-[110px] h-[50px] text-[18px] font-medium ">
                  <p className="ms-[4px]">Try</p>
                  <img
                    src="/images/icons/arrow_forward2.svg"
                    alt="Scroll down"
                    width={24}
                    height={24}
                    className="text-black invert"
                  />
                </Button>
              </div>
            </div>
          </div>

          <p className="text-white text-xl mt-3 ">
            When you can just{" "}
            <span className="text-focused font-bold ">
              ask AI to send it to you regularly
            </span>
          </p>
        </main>

        <section className="mt-44">
          <h2 className="text-white text-center font-bold text-4xl ">
            What's <span className="text-focused font-bold">NeuraLetter</span> ?
          </h2>
          <DemoEmail></DemoEmail>
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
        </section>
      </div>
    </AuroraBackground>
  );
}
