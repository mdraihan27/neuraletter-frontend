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
import { use, useState } from "react";
import {
  sendVerificationCode,
  verifyVerificationCode,
} from "@/api/verificationApi";
import { verifyPasswordResetCode } from "@/api/passwordResetApi";
import { redirect } from "next/navigation";

export function ForgetPasswordVerificationForm({ className, email, setIsLoading, ...props }) {
  const [message, setMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");


  const handleVerifyButtonClick = async () => {
    setIsLoading(true);
    const result = await verifyPasswordResetCode(email, verificationCode);

    if (result.success) {
      redirect("/reset-password");
    } else {
      setMessage(result.error);
    }
    setIsLoading(false);
  };

  c;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card
        className={
          "bg-[#13131330] backdrop-blur-2xl text-slate-200 flex flex-col "
        }
      >
        <CardHeader>
          <CardTitle className={"mx-auto text-xl flex flex-col items-center"}>
            Enter the code sent to your email<br></br>
            <p className="text-sm font-normal text-center">{email}</p>
          </CardTitle>
          <CardDescription className={"mx-auto text-red-600"}>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="verification-code">Verification Code</FieldLabel>
                <Input
                  id="verification-code"
                  type="text"
                  placeholder="secret code"
                  required
                  value={verificationCode} 
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </Field>

              <Field>
                <Button
                  type="button"
                  className={"text-slate-900 cursor-pointer"}
                  onClick={handleVerifyButtonClick}
                >
                  Verify
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
