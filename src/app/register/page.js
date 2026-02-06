"use client";
import { LoginForm } from "@/app/login/login-form";
import { SignupForm } from "@/app/register/signup-form";
import { Nav } from "@/components/ui/nav";
import { GalleryVerticalEnd } from "lucide-react";
import { DarkVeil } from "@/components/background/DarkVeil";
import { Spinner } from "@/components/ui/spinner";

import { useState, useRef, useEffect } from "react";
import React from "react";

import { FooterColumns01 } from "@/components/blocks/footer/footer-columns-01";

export default function Register() {
  const [error, setError] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryMessage = params.get("error");

    if (queryMessage) {
      setError(queryMessage);
    }
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className=" bg-[#0f0f0f]  absolute inset-0 z-0 flex flex-col items-center"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 100%, #000000 40%, #0A1C57 100%)",
      }}
    >
      {isLoading ? <Spinner /> : null}

      <Nav
        navItems={[]}
        navButtons={[
          { id: "login", navButtonName: "Login", redirectLink: "/login" },
          { id: "try", navButtonName: "Try Now", redirectLink: "" },
        ]}
        className="mx-auto"
      ></Nav>

      <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 max-w-[500px]">
        <GalleryVerticalEnd className="size-4" />

        <SignupForm className={"scale-120 mt-20"} setIsLoading={setIsLoading} error={error}/>
      </div>
      <FooterColumns01 />
    </div>
  );
}
