"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/imported/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/imported/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/imported/field";
import { Input } from "@/components/ui/imported/input";

import { login } from "@/api/authApi";
import { useState } from "react";
import {
  sendVerificationCode,
  verifyVerificationCode,
} from "@/api/verificationApi";
import { redirect } from "next/navigation";

export function VerificationForm({ className, email, setIsLoading, ...props }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerifyClick = async () => {
    setIsLoading(true);
    const result = await verifyVerificationCode(verificationCode);

    if (result.success) {
      redirect("/dashboard");
    } else {
      setMessage(result.error);
    }
  };

  const handleResendClick = async () => {
    setIsLoading(true);
    const result = await sendVerificationCode();
    setIsLoading(false);
    if (!result.success) {
      setMessage(result.error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card
        className={
          "bg-[#13131330] backdrop-blur-2xl text-slate-200 flex flex-col "
        }
      >
        <CardHeader>
          <CardTitle className={"mx-auto text-xl flex flex-col items-center"}>
            Enter the verification code sent to<br></br>
            <p className="text-sm font-normal">{email}</p>
          </CardTitle>
          <CardDescription className={"mx-auto text-red-600"}>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="verification-code">
                  Verification Code
                </FieldLabel>
                <Input
                  id="verification-code"
                  type="number"
                  placeholder=""
                  required
                  value={verificationCode} // bind value to state
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </Field>

              <Field>
                <Button
                  type="button"
                  className={"text-slate-900 cursor-pointer"}
                  onClick={handleVerifyClick}
                >
                  Verify
                </Button>

                <FieldDescription className="flex justify-start gap-2">
                  Didn&apos;t get the code?{" "}
                  <button
                    type="button"
                    className="underline font-semibold text-white cursor-pointer hover:text-gray-300"
                    onClick={handleResendClick}
                  >
                    Resend Code
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
