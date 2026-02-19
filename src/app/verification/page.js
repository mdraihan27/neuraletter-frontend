"use client";
import { LoginForm } from "@/app/login/login-form";
import { SignupForm } from "@/app/register/signup-form";
import { Nav } from "@/components/ui/nav";
import { GalleryVerticalEnd } from "lucide-react";
import { DarkVeil } from "@/components/background/DarkVeil";
import { VerificationForm } from "./verification-form";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import React from "react";

import { FooterColumns01 } from "@/components/blocks/footer/footer-columns-01";
import { Spinner } from "@/components/ui/spinner";

function VerificationInner() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  return (
    <div
      className="absolute inset-0 z-0 flex flex-col items-center "
      style={{
        background:
          "radial-gradient(125% 125% at 50% 100%, #000000 40%, #0A1C57 100%)",
      }}
    >

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
        className={"w-full max-w-[420px] px-5 mt-28 sm:mt-40 lg:mt-48 mb-16 sm:mb-24 lg:mb-32 lg:scale-110 "}
        email={email}
        setIsLoading={setIsLoading}
      ></VerificationForm>
      <FooterColumns01 />
    </div>
  );
}

export default function Verification() {
  return (
    <Suspense fallback={<Spinner />}>
      <VerificationInner />
    </Suspense>
  );
}
