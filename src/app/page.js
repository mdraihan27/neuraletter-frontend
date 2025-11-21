"use client";
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";
import { EmailSkeleton } from "@/components/layout/email-skeleton";
import TypingText from "@/components/ui/shadcn-io/typing-text/index";
import { Nav } from "@/components/ui/nav";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { GradientText } from "@/components/ui/shadcn-io/gradient-text/index";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Beams } from "@/components/Beams";
import Silk from "@/components/Silk/Silk";

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);
  return (
    <div className="w-full hide-scrollbar-y bg-black">
      <div>
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
          <main className="w-dvw flex justify-center items-center flex-col">
            <h1 className="text-[74px] max-w-7xl text-center font-bold text-focused mt-28 leading-16">
              NeuraLetter
            </h1>
            <h1 className="text-[74px] text-white font-bold ">
              Newsletter Redefined
            </h1>
            <h2 className="text-xl font-medium mt-3 bg-linear-to-r from-[#9fb7ff] via-[#ffffff] to-[#c4b4ff] bg-clip-text text-transparent">
              Powered by AI
            </h2>

            <div className="border-[#161616] border-4 bg-[#18181885] h-[230px] w-[700px] rounded-3xl mt-24 px-11 shadow-[inset_0_0_0_2px_#92adff20]">
              <textarea
                className="bg-[#ffffff0] w-[600px] h-[100px] absolute text-xl text-[#ffffff75] resize-none mt-9 focus:outline-none"
                autoFocus
                onChange={(e) => {
                  setIsTyping(e.target.value.length > 0);
                }}
              ></textarea>
              <div className="flex flex-col justify-between h-[230px] ">
                {!isTyping && (
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
                    className="text-xl mt-9"
                    textColors={["#ffffff35"]}
                    variableSpeed={{ min: 10, max: 90 }}
                  />
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

                  <Button className="bg-focused hover:bg-hover-focused text-black items-center rounded-[30px] flex justify-center gap-2 w-[110px] h-[50px] text-[18px] font-medium">
                    <p className="ms-1">Try</p>
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
              <span className="text-white font-medium ">
                Ask AI to{" "}
                <span className="text-focused">
                  recieve updates of your interest
                </span>{" "}
                regularly
              </span>
            </p>
          </main>
        </AuroraBackground>
      </div>

      <div className="mt-5 flex flex-col items-center">
        {/* <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
          className="w-[1920px]"
        /> */}
        {/* <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1}
          rotation={0}
          className="h-full"
        /> */}
        <GradientText
          text="How does it work?"
          gradient="linear-gradient(90deg, #92adff 0%, #ffffff 50%, #92adff 100%)"
          className="absolute z-40 mt-10 text-3xl font-bold"
        />
        ;
        <LampContainer className="font-poppins ">
          <InfiniteMovingCards
            direction="left"
            speed="slow"
            className="mt-8"
            pauseOnHover={false}
          ></InfiniteMovingCards>
        </LampContainer>
        <div className="flex justify-center gap-10 items-center mt-20">
          <div className="flex flex-col gap-8 max-w-[400px] text-white text-[50px] font-bold text-right"></div>

          <EmailSkeleton className=""></EmailSkeleton>

          <div className="flex flex-col gap-8 max-w-[400px] text-white text-[23px] font-light text-left">
            <p>
              <span className="text-focused font-bold">Any update</span> of your
              topic of interest would be{" "}
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
        
      </div>
    </div>
  );
}
