"use client";
import { LoginForm } from "@/app/login/login-form";
import { SignupForm } from "@/app/register/signup-form";
import { Nav } from "@/components/ui/nav";
import { GalleryVerticalEnd } from "lucide-react";
import { DarkVeil } from "@/components/background/DarkVeil";
import { VerificationForm } from "./verification-form";
import { useState, useRef, useEffect } from "react";
import React from "react";

import { FooterColumns01 } from "@/components/blocks/footer/footer-columns-01";
import { Spinner } from "@/components/ui/spinner";



export default function Verification() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div
      className="absolute inset-0 z-0 flex flex-col items-center "
      style={{
        background:
          "radial-gradient(125% 125% at 50% 100%, #000000 40%, #0A1C57 100%)",
      }}
    >
      {/* Your Content/Components */}

      {isLoading ? <Spinner /> : null}

      <Nav
        navItems={[]}
        navButtons={[
          { id: "login", navButtonName: "Login", redirectLink: "/" },
          { id: "try", navButtonName: "Try Now", redirectLink: "/register" },
        ]}
        className="mx-auto"
      ></Nav>

      <VerificationForm
        className={"w-[400px] mt-60 mb-44 scale-130 "}
        email={"email"}
        setIsLoading={setIsLoading}
      ></VerificationForm>
      <FooterColumns01 />
    </div>
  );
}
