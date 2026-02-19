"use client";
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";
import TypingText from "@/components/ui/shadcn-io/typing-text/index";
import { Nav } from "@/components/ui/nav";
import { Button } from "@/components/ui/imported/button";
import { useState, useRef, useEffect } from "react";
import React from "react";
import Link from "next/link";

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
    <div className="w-screen flex justify-center overflow-x-hidden">
      <div className="w-full">
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

        <div
          className="w-full hide-scrollbar-y bg-black relative"
          ref={homeRef}
        >
          {/* ━━━ HERO ━━━ */}
          <AuroraBackground className="bg-black">
            <div className="w-full max-w-7xl mx-auto flex justify-center items-center flex-col mt-20 lg:mt-28 px-4 sm:px-6">
              <h1
                className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[74px] max-w-7xl text-center font-bold text-focused mt-16 sm:mt-20 lg:mt-28 leading-tight sm:leading-tight lg:leading-16"
              >
                NeuraLetter
              </h1>
              <h1 className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[74px] text-white font-bold text-center leading-tight">
                Newsletter Redefined
              </h1>
              <h2
                className="text-base sm:text-lg lg:text-xl font-medium mt-3 bg-linear-to-r from-[#9fb7ff] via-[#ffffff] to-[#c4b4ff] bg-clip-text text-transparent text-center"
              >
                Powered by AI
              </h2>

              {/* Prompt Box */}
              <div
                className="border-[#161616] border-4 bg-[#18181885] w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[180px] sm:h-[200px] lg:h-[230px] rounded-2xl sm:rounded-3xl mt-10 sm:mt-16 lg:mt-24 px-5 sm:px-8 lg:px-11 shadow-[inset_0_0_0_2px_#92adff20] relative"
              >
                <textarea
                  className="bg-transparent w-full h-[80px] sm:h-[100px] text-base sm:text-lg lg:text-xl text-[#ffffff75] resize-none mt-6 sm:mt-9 focus:outline-none z-50 relative"
                  autoFocus
                  onChange={(e) => {
                    setIsTyping(e.target.value.length > 0);
                  }}
                ></textarea>
                <div className="flex flex-col justify-between h-full absolute inset-0 px-5 sm:px-8 lg:px-11">
                  <TypingText
                    text={[
                      "Latest research papers on Transformers, model and Neural networks",
                      "Satellite Imagery Analysis, Military Movements, and Territorial Changes in Ongoing Conflicts",
                      "AI Regulation Developments, Open-Source Model Leaks, Ethical AI Frameworks",
                      "Innovations in Renewable Energy Storage, Battery Technology Advances",
                    ]}
                    id="typing_text_prompt"
                    typingSpeed={725}
                    pauseDuration={1500}
                    showCursor={false}
                    cursorCharacter="|"
                    cursorClassName="bg-white ms-2 h-[20px]"
                    className="text-base sm:text-lg lg:text-xl mt-6 sm:mt-9"
                    style={{ visibility: isTyping ? "hidden" : "visible" }}
                    textColors={["#ffffff35"]}
                    variableSpeed={{ min: 10, max: 90 }}
                  />

                  <div className="flex justify-between items-center mb-5 sm:mb-7">
                    <div className="w-[80px] sm:w-[150px] h-[30px] flex items-center rounded-sm">
                    </div>

                    <Link href="/register" className="cursor-pointer z-50">
                      <Button className="bg-focused hover:bg-hover-focused text-black items-center rounded-[30px] flex justify-center gap-2 w-[90px] h-[42px] sm:w-[110px] sm:h-[50px] text-[16px] sm:text-[18px] font-medium cursor-pointer">
                        <p className="ms-1">Try</p>
                        <img
                          src="/images/icons/arrow_forward2.svg"
                          alt="Go to signup"
                          width={24}
                          height={24}
                          className="text-black invert"
                        />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <p className="text-white text-sm sm:text-base lg:text-xl mt-3 text-center px-4">
                <span className="text-white font-medium">
                  Ask AI to{" "}
                  <span className="text-focused">
                    recieve updates of your interest
                  </span>{" "}
                  regularly
                </span>
              </p>
            </div>
          </AuroraBackground>

          {/* ━━━ FEATURES ━━━ */}
          <div
            className="mt-16 sm:mt-24 lg:mt-36 flex flex-col items-center relative px-4"
            ref={featureRef}
          >
            <h4 className="text-white text-xl sm:text-2xl lg:text-3xl z-40 text-center">
              How does it work?
            </h4>

            {/* Lamp + Infinite Cards — hidden on mobile, shown on tablet+ */}
            <div className="hidden md:block">
              <LampContainer className="font-poppins">
                <InfiniteMovingCards
                  direction="left"
                  speed="slow"
                  className=""
                  pauseOnHover={false}
                ></InfiniteMovingCards>
              </LampContainer>
            </div>

            {/* Mobile-only: simple glow divider instead of lamp */}
            <div className="block md:hidden mt-8 mb-4">
              <div className="w-40 h-[2px] bg-focused mx-auto rounded-full opacity-60" />
              <div className="w-24 h-[1px] bg-focused/30 mx-auto rounded-full mt-1 blur-sm" />
            </div>

            {/* Feature cards — responsive grid on smaller screens, original absolute positioning on lg */}
            <div className="
              grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl mt-6
              lg:flex lg:flex-row lg:gap-10 lg:absolute lg:top-[700px] lg:max-w-none lg:w-auto lg:mt-0
            ">
              <ItemCard text={"Explain your interests"} ItemIcon={Brain} />
              <ItemCard text={"Choose update frequency"} ItemIcon={Clock} />
              <ItemCard text={"AI researches for you"} ItemIcon={Search} />
              <ItemCard text={"Summaries in your inbox"} ItemIcon={Mail} />
            </div>
          </div>

          {/* ━━━ PRICING ━━━ */}
          <div
            className="w-full flex flex-col items-center relative px-4"
            ref={pricingRef}
          >
            <DarkVeil className={"absolute bottom-0  rotate-180 saturate-6"} />

            <h4 className="text-white text-xl sm:text-2xl lg:text-3xl z-60 text-center mt-8 lg:mt-0">
              Choose the plan best for you
            </h4>

            <div className="flex flex-col items-center gap-8 w-full mt-12 sm:mt-16 lg:mt-24 pb-16 sm:pb-20 lg:flex-row lg:justify-center lg:gap-10 lg:items-center">
              <PricingCard
                planName={"Free"}
                comment={"Perfect for trying Neuraletter"}
                price={"0"}
                features={["Analysis by free LLM models", "Unlimited topics per user"]}
              />
              <div className="hidden sm:flex flex-col items-center rounded-2xl order-first lg:order-none">
                {/* <p className="mb-[2px] z-30 text-white font-semibold">
                  Most Popular
                </p> */}

                <PricingCard
                  planName={"Pro (coming soom)"}
                  comment={"Perfect for professional research"}
                  price={"1.99"}
                  features={[
                    "Analysis by pro LLM models",
                    "Unlimited topics per user",
                    "24/7 support",
                    "Cancel anytime",
                  ]}
                />
              </div>
              <div className="hidden sm:block">
              <PricingCard
                planName={"Pro Plus (coming soon)"}
                comment={"Perfect if research earns you money"}
                price={"9.99"}
                features={[
                  "Analysis by pro LLM models",
                  "Unlimited topics per user",
                  "Get discounts as you go",
                  "24/7 support",
                  "Cancel anytime",
                ]}
              />
              </div>
            </div>
          </div>

          <FooterColumns01 className="" />
        </div>
      </div>
    </div>
  );
}
