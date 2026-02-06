"use client";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { updateUser } from "@/api/userApi";
import { Spinner } from "@/components/ui/spinner";
import { sendPasswordResetCode } from "@/api/passwordResetApi";
import { redirect } from "next/navigation";
export function Profile({ className, setIsProfileVisible }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {

    setFirstName(localStorage.getItem("first_name"))
    setLastName(localStorage.getItem("last_name"))
    setEmail(localStorage.getItem("email"));
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  

  const handleUpdateClick = async () => {
    setIsLoading(true);
    const result = await updateUser(firstName, lastName);

    if (result.success) {
      setIsError(true);
      setMessage(result.data.message);
    } else {
      setIsError(false);
      setMessage(result.error);
    }
    setIsLoading(false);
  };

  const handleChangePasswordClick = async () => {
    setIsLoading(true);
    const result = await sendPasswordResetCode(email);

    if (result.success) {
      setIsError(true);
      setMessage(result.data.message);
      redirect(`/verify?email=${email}`);
    } else {
      setIsError(false);
      setMessage(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="">
      {isLoading ? (
        <div className="fixed inset-0 z-[100]">
          <Spinner />
        </div>
      ) : null}
      <div
        className={cn(
          "absolute left-1/3 top-1/5  z-10  bg-zinc-800  rounded-xl shadow-2xl text-white p-4 shadow-black/50 ",
          className
        )}
      >
        <div className="flex w-full justify-between">
          <p className="font-medium text-xl">Edit Profile</p>

          <Plus
            className="rotate-45 text-zinc-600 hover:text-red-300 cursor-pointer"
            onClick={() => setIsProfileVisible(false)}
          />
        </div>

        <div className="w-full p-3 pt-8">
          <div className="flex gap-5 justify-between">
            <div className="border-1 border-zinc-400 rounded-md flex flex-col gap-1 px-3 py-2">
              <p className="text-xs">First Name</p>
              <input
                className="focus:outline-none text-lg w-[256px]"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className="border-1 border-zinc-400 rounded-md flex flex-col gap-1 px-3 py-2">
              <p className="text-xs">Last Name</p>
              <input
                className="focus:outline-none text-lg w-[256px]"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="w-full flex py-4 justify-between items-center">
            <p
              className={cn(
                "text-sm ",
                isError ? "text-green-400" : "text-red-300"
              )}
            >
              {message}
            </p>
            <button
              className="px-3 r py-2 bg-focused text-zinc-800 rounded-sm cursor-pointer hover:bg-hover-focused"
              onClick={handleUpdateClick}
            >
              Update
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs">Email</p>
            <p className="text-lg">{email}</p>
          </div>

          <div>
            <button
              className="bg-focused hover:bg-hover-focused rounded-sm px-3 py-2 text-zinc-800 mt-8 cursor-pointer"
              onClick={handleChangePasswordClick}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
