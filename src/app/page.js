"use client";
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";
import { EmailSkeleton } from "@/components/layout/email-skeleton";
import TypingText from "@/components/ui/shadcn-io/typing-text/index";
import { Nav } from "@/components/ui/nav";
import { Button } from "@/components/ui/imported/button";
import { useState, useRef, useEffect } from "react";
import React from "react";

import { LampContainer } from "@/components/ui/imported/lamp";
import { InfiniteMovingCards } from "@/components/ui/imported/infinite-moving-cards";

import { FooterColumns01 } from "@/components/blocks/footer/footer-columns-01";

import { DarkVeil } from "@/components/background/DarkVeil";
import { ItemCard } from "@/app/item-card";
import { Brain, Clock, Search, Mail } from "lucide-react";
import { PricingCard } from "@/app/pricing-card";

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const homeRef = useRef(null);
  const featureRef = useRef(null);
  const pricingRef = useRef(null);



  return (
    <div>
      <Nav
        navItems={[
          { id: "home", navItemName: "Home", targetRef: homeRef, offset: 0 },
          {
            id: "about",
            navItemName: "Feature",
            targetRef: featureRef,
            offset: 100,
          },
          {
            id: "features",
            navItemName: "Pricing",
            targetRef: pricingRef,
            offset: 120,
          },
        ]}
        navButtons={[
          { id: "login", navButtonName: "Login", redirectLink: "/login" },
          { id: "try", navButtonName: "Try Now", redirectLink: "/register" },
        ]}
        className="mx-auto"
      ></Nav>

      <div className="w-full hide-scrollbar-y bg-black relative" ref={homeRef}>
        <AuroraBackground className="bg-black">
          <div className="w-dvw flex justify-center items-center flex-col mt-28">
            <h1
              className={
                "text-[74px] max-w-7xl text-center font-bold text-focused mt-28 leading-16 "
              }
            >
              NeuraLetter
            </h1>
            <h1
              className={
                "text-[74px] text-white font-bold"
              }
            >
              Newsletter Redefined
            </h1>
            <h2
              className={
                "text-xl font-medium mt-3 bg-linear-to-r from-[#9fb7ff] via-[#ffffff] to-[#c4b4ff] bg-clip-text text-transparent "
              }
            >
              Powered by AI
            </h2>

            <div
              className={
                "border-[#161616] border-4 bg-[#18181885] h-[230px] w-[700px] rounded-3xl mt-24 px-11 shadow-[inset_0_0_0_2px_#92adff20] "
              }
            >
              <textarea
                className="bg-[#ffffff0] w-[600px] h-[100px] absolute text-xl text-[#ffffff75] resize-none mt-9 focus:outline-none"
                autoFocus
                onChange={(e) => {
                  setIsTyping(e.target.value.length > 0);
                }}
              ></textarea>
              <div className="flex flex-col justify-between h-[230px] ">
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
                  style={{ visibility: isTyping ? "hidden" : "visible" }}
                  textColors={["#ffffff35"]}
                  variableSpeed={{ min: 10, max: 90 }}
                />

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

            <p className={"text-white text-xl mt-3 "}>
              <span className="text-white font-medium ">
                Ask AI to{" "}
                <span className="text-focused">
                  recieve updates of your interest
                </span>{" "}
                regularly
              </span>
            </p>
          </div>
        </AuroraBackground>

        <div className="mt-5 flex flex-col items-center" ref={featureRef}>
          {/* <GradientText
          text="Features"
          gradient="linear-gradient(90deg, #92adff 0%, #ffffff 50%, #92adff 100%)"
          className="absolute z-40 mt-10 text-3xl font-bold"
        /> */}
          {/* <h3 className="absolute z-40 mt-10 text-3xl font-bold bg-linear-to-r from-gray-500 via-[#ffffff] to-gray-500 text-transparent bg-clip-text" >How does it work?</h3> */}
          <h4 className="text-white text-3xl absolute z-40 mt-4">
            How does it work?
          </h4>

          <LampContainer className="font-poppins ">
            <InfiniteMovingCards
              direction="left"
              speed="slow"
              className="mt-8"
              pauseOnHover={false}
            ></InfiniteMovingCards>
          </LampContainer>
          <div className="flex gap-10 absolute mt-[720px]">
            <ItemCard text={"Explain your interests"} ItemIcon={Brain} />
            <ItemCard text={"Choose update frequency"} ItemIcon={Clock} />
            <ItemCard text={"AI researches for you 24/7"} ItemIcon={Search} />
            <ItemCard text={"Summaries in your inbox"} ItemIcon={Mail} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center relative" ref={pricingRef}>
          {/* <GradientText
          text="Pricing"
          gradient="linear-gradient(90deg, #92adff 0%, #ffffff 50%, #92adff 100%)"
          className="z-40 mt-10 text-3xl font-bold"
        /> */}
         <DarkVeil className={"absolute bottom-0  rotate-180 saturate-6"} />

          <h4 className="text-white text-3xl z-60">Choose the plan best for you</h4>

          <div className="flex w-full mt-24 items-center justify-center gap-10 pb-20">
           
            <PricingCard
              planName={"Free"}
              comment={"Perfect for trying Neuraletter"}
              price={"0"}
              features={["Analysis by free LLM models", "One topic per user"]}
            />
            <div className="flex flex-col items-center mb-[25px] rounded-2xl ">
              <p className="mb-[2px] z-60 text-white font-semibold">Most Popular</p>
             
                <PricingCard
                  planName={"Pro"}
                  comment={"Perfect for professional research"}
                  price={"1.99"}
                  features={[
                    "Analysis by pro LLM models",
                    "5 topics per user",
                    "24/7 support",
                    "Cancel anytime",
                  ]}
                />
              
            </div>
            <PricingCard
              planName={"Pro Plus"}
              comment={"Perfect if research earns you money"}
              price={"9.99"}
              features={[
                "Analysis by pro LLM models",
                "No topic limits",
                "Get discounts as you go",
                "24/7 support",
                "Cancel anytime",
              ]}
            />
          </div>
        </div>

        <FooterColumns01 className="" />
      </div>
    </div>
  );
}
