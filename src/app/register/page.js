"use client";
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";
import { EmailSkeleton } from "@/components/layout/email-skeleton";
import TypingText from "@/components/ui/shadcn-io/typing-text/index";
import { Nav } from "@/components/ui/nav";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { GradientText } from "@/components/ui/shadcn-io/gradient-text/index";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FooterColumns01 } from "@/components/blocks/footer/footer-columns-01";
import { Beams } from "@/components/Beams";
import { DarkVeil } from "@/components/DarkVeil";
import { ItemCard } from "@/components/ui/landing/item-card";
import { Brain, Clock, Search, Mail } from "lucide-react";
import { PricingCard } from "@/components/ui/landing/pricing-card";

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const homeRef = useRef(null);
  const featureRef = useRef(null);
  const pricingRef = useRef(null);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="min-h-screen w-full relative">
     
      {/* Your Content/Components */}
      <Nav
        navButtons={[
          { id: "login", navButtonName: "Login", redirectLink: "" },
          { id: "try", navButtonName: "Try Now", redirectLink: "" },
        ]}
        className="mx-auto"
      ></Nav>

      <div className="bg-[#997adff30] h-full w-[1080px]">

      </div>
      

        <FooterColumns01/>
      
    </div>
  );
}
