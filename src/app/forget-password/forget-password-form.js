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
import { redirect } from "next/navigation";
import { sendPasswordResetCode } from "@/api/passwordResetApi";

export function ForgetPasswordForm({ className, setIsLoading, ...props }) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const handleSendButtonClick = async () => {
    setIsLoading(true);
    const result = await sendPasswordResetCode(email);

    if (result.success) {
      redirect(`/verify?email=${email}`);
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
            Forgot Password?<br></br>
            <p className="text-sm font-normal">Enter you email address</p>
          </CardTitle>
          <CardDescription className={"mx-auto text-red-600"}>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="verification-code">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="raihan@example.com"
                  required
                  value={email} // bind value to state
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <Button
                  type="button"
                  className={"text-slate-900 cursor-pointer"}
                  onClick={handleSendButtonClick}
                >
                  Send Verification Code
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
