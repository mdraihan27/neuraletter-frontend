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
import { signup, googleLogin } from "@/api/authApi";
import { useEffect, useState } from "react";
import { sendVerificationCode } from "@/api/verificationApi";
import { redirect } from "next/navigation";

export function SignupForm({ className, setIsLoading, error, ...props }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMatched, setPasswordMatched] = useState(null);
  const [message, setMessage] = useState(error);

  useEffect(() => {
    setMessage(error);
  }, [error]);

  const handleSignupClick = async () => {
    setIsLoading(true);
    const result = await signup(firstName, lastName, email, password);
    
    if (result.success) {
      const codeResult = await sendVerificationCode();
      console.log(codeResult)
      if (codeResult.success) {
        redirect("/verification");
      } else {
        // redirect("/dashboard");
      }
    } else {
      setMessage(result.error);
    }
    setIsLoading(false);
  };

  const handleGoogleSignupClick = async () => {
    setIsLoading(true);
    const result = await googleLogin()
    
    if (result.success) {
    //  redirect(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/login`);
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
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription className={"text-red-600"}>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <div className="flex gap-4">
                <Field>
                  <FieldLabel htmlFor="name">First Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Raihan"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="name">Last Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Hossen"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Field>
              </div>
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
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
                      Confirm Password
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
              <Field>
                <Button
                  type="button"
                  className={"text-slate-950 cursor-pointer"}
                  onClick={handleSignupClick}
                >
                  Create Account
                </Button>
                <Button type="button" className="flex items-center gap-2 cursor-pointer" onClick={handleGoogleSignupClick}>
                  <img
                    src="/images/icons/Google.svg"
                    width={18}
                    height={18}
                    alt=""
                    aria-hidden="true"
                  />
                  <p className="text-slate-800">Continue with Google</p>
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
