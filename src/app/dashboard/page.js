"use client";
import { LogOut } from "lucide-react";
import { useState } from "react";
import React from "react";
import { SideBar } from "./sidebar";
import { logOut } from "@/lib/logOut";
import { Spinner } from "@/components/ui/spinner";
import { Profile } from "./profile";
import { cn } from "@/lib/utils";
import {Main} from "@/app/dashboard/main"

export default function Dashboard() {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogOutClick = async () => {
    setIsLoading(true);
    await logOut();
    setIsLoading(false);
  };
  return (
    <div className="relative w-screen h-screen bg-zinc-800 ">
      <div
        className={cn(
          " bg-zinc-800 inset-0 z-0 flex justify-between  h-screen  ",
          isProfileVisible
            ? "blur-[1px] brightness-60 pointer-events-none"
            : "brightness-100 blur-none pointer-events-auto"
        )}
      >
        {isLoading ? <Spinner /> : null}

        <SideBar
          topicList={topicList}
          setIsProfileVisible={setIsProfileVisible}
        />
        <div className={"flex flex-col h-full w-full px-8 gap-8"}>
          <div>
            <div
              className="text-white flex items-center justify-end gap-3 pt-6 cursor-pointer hover:text-focused"
              onClick={handleLogOutClick}
            >
              <p>Log Out</p>
              <LogOut />
            </div>
          </div>
          <Main/>
         
        </div>
      </div>
      <Profile
        className={isProfileVisible ? "block" : "hidden"}
        setIsProfileVisible={setIsProfileVisible}
      />
    </div>
  );
}

const topicList = [
  { topicName: "Introduction to Programming", id: "1" },
  { topicName: "Variables and Data Types", id: "2" },
  { topicName: "Conditional Statements", id: "3" },
  { topicName: "Loops and Iterations", id: "4" },
  { topicName: "Functions and Scope", id: "5" },
  { topicName: "Arrays and Objects", id: "6" },
  { topicName: "DOM Manipulation", id: "7" },
  { topicName: "Event Handling in JavaScript", id: "8" },
  { topicName: "Asynchronous JavaScript", id: "9" },
  { topicName: "Introduction to React", id: "10" },
];
