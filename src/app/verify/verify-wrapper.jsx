"use client";

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ForgetPasswordVerificationForm } from "./forget-password-verification-form";
import { useSearchParams } from "next/navigation";

export function ForgetPasswordVerificationFormWrapper() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <ForgetPasswordVerificationForm
        email={email}
        className={"w-full max-w-[420px] px-5 mt-28 sm:mt-40 lg:mt-48 mb-16 sm:mb-24 lg:mb-32 lg:scale-110 "}
        setIsLoading={setIsLoading}
      />
    </>
  );
}
