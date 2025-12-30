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
        className={"w-[400px] mt-60 mb-44 scale-130 "}
        setIsLoading={setIsLoading}
      />
    </>
  );
}
