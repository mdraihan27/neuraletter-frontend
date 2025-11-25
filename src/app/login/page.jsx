"use client";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { Nav } from "@/components/ui/nav";
import { GalleryVerticalEnd } from "lucide-react";
import { DarkVeil } from "@/components/DarkVeil";

import { useState, useRef, useEffect } from "react";
import React from "react";

import { FooterColumns01 } from "@/components/blocks/footer/footer-columns-01";

export default function Login() {
  const [isTyping, setIsTyping] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const homeRef = useRef(null);
  const featureRef = useRef(null);
  const pricingRef = useRef(null);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div
      className=" bg-[#0f0f0f]  absolute inset-0 z-0 flex flex-col items-center "
      style={{
        background:
          "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
      }}
    >
      {/* Your Content/Components */}

      <Nav
        navItems={[]}
        navButtons={[
          { id: "login", navButtonName: "Login", redirectLink: "/" },
          { id: "try", navButtonName: "Try Now", redirectLink: "/register" },
        ]}
        className="mx-auto"
      ></Nav>

      <LoginForm className={"w-[400px] mt-60 mb-44 scale-130 "}></LoginForm>
      <FooterColumns01 />
    </div>
  );
}
