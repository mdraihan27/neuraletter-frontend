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
import { signup } from "@/api/authApi";
import { useEffect, useState } from "react";
import { sendVerificationCode } from "@/api/verificationApi";
import { redirect } from "next/navigation";
import { resetPasswordUsingCode } from "@/api/passwordResetApi";

export function ResetPasswordForm({ className, setIsLoading, ...props }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMatched, setPasswordMatched] = useState(null);
  const [message, setMessage] = useState("");

  const handleChangePasswordClick = async () => {
    setIsLoading(true);
    const result = await resetPasswordUsingCode(password);

    if (result.success) {
        redirect("/dashboard")
    } else {
      setMessage(result.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!password && !confirmPassword) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPasswordMatched(null);
    } else {
      setPasswordMatched(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={"bg-[#13131350] backdrop-blur-2xl text-slate-100"}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Change Your Password</CardTitle>
          <CardDescription className={"text-red-600"}>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Field>
              <Field>
                <Field>
                  <FieldLabel htmlFor="password">New Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm New Password
                  </FieldLabel>
                  <Input
                    className={
                      passwordMatched === true
                        ? "bg-[#19ff1930]"
                        : passwordMatched === false
                        ? "bg-[#df1a1a30]"
                        : "bg-transparent"
                    }
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Field>
              </Field>

              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field className={"mt-5"}>
              <Button
                type="button"
                className={"text-slate-950 cursor-pointer"}
                onClick={handleChangePasswordClick}
              >
                Change Password
              </Button>
            </Field>
          </form>
        </CardContent>
      </Card>
      
    </div>
  );
}
