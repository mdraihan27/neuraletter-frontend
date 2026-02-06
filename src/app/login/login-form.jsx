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
import { redirect } from "next/navigation";
import { login, googleLogin } from "@/api/authApi";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { sendVerificationCode } from "@/api/verificationApi";

export function LoginForm({ className, setIsLoading, error, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(error);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessage(error);
  }, [error]);

  const handleLoginClick = async () => {
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      console.log(result);
      if (result.data.user_info.is_verified !== true) {
        const codeResult = await sendVerificationCode();

        if (codeResult.success) {
          redirect("/verification");
        } else {
          redirect("/dashboard");
        }
      } else {
        redirect("/dashboard");
      }
    } else {
      setMessage(result.error);
    }
  };

  const handleGoogleLoginClick = async () => {
    setIsLoading(true);
    const result = await googleLogin();

    if (result.success) {
      //  redirect(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/login`);
    } else {
      setMessage(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card
        className={
          "bg-[#13131330] backdrop-blur-2xl text-slate-200 flex flex-col "
        }
      >
        <CardHeader>
          <CardTitle className={"mx-auto text-xl"}>
            Login to your account
          </CardTitle>
          <CardDescription className={"mx-auto text-red-600"}>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="raihan@example.com"
                  required
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/forget-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button
                  type="button"
                  className={"text-slate-900 cursor-pointer"}
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Button type="button" onClick={handleGoogleLoginClick}>
                  <img
                    src="/images/icons/Google.svg"
                    width={18}
                    height={18}
                    role="img"
                    {...props}
                  />
                  <p className="text-slate-800 cursor-pointer">
                    Continue with Google
                  </p>
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
