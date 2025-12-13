"use client";
import Image from "next/image";
import {
  PanelLeftClose,
  Frame,
  Plus,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function SideBar({ topicList, setIsProfileVisible, className }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [firstName, setFirstName]=useState(localStorage.getItem("first_name"))
  return (
    <div
      className={cn(
        " bg-[#1f1f1f] h-full px-3 py-3 text-white flex flex-col justify-between w-1/5", className)
      }
    >
      <div>
        <div
          className={
            cn("flex justify-between pb-3 ",
            (isCollapsed ? "flex-col gap-2 items-center" : "flex-row gap-0"))
          }
        >
          <div className="w-10 h-10 cursor-pointer  hover:bg-zinc-600 flex items-center justify-center rounded-full">
            <Image
              src="/images/neuraletter_logo.png"
              alt=""
              width={18}
              height={18}
              className=""
            />
          </div>
          <div
            className="w-10 h-10 cursor-pointer  hover:bg-zinc-600 flex items-center justify-center rounded-full"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <PanelLeftClose
              height={"24px"}
              width={"24px"}
              className="text-white cursor-pointer"
            ></PanelLeftClose>
          </div>
        </div>

        <div>
          <SideBarItem
            Icon={Plus}
            text={"New Topic"}
            className={"bg-[#92adff70] mt-2 "}
            
            isCollapsed={isCollapsed}
          />

          <div>
            <div className="flex flex-col gap-1 mt-5">
              {topicList.map((topic) => (
                <Topic
                  topicName={topic.topicName}
                  key={topic.id}
                  isCollapsed={isCollapsed}
                ></Topic>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="gap-1">
        <SideBarItem
          Icon={Settings}
          text={"Settings"}
          isCollapsed={isCollapsed}
        />
        <SideBarItem
          Icon={UserRoundCog}
          text={firstName}
          isCollapsed={isCollapsed}
          onClick={()=>setIsProfileVisible(true)}
        />
      </div>
    </div>
  );
}

export function Topic({ topicName, isCollapsed }) {
  return isCollapsed ? null : (
    <div className="cursor-pointer hover:bg-zinc-600 hover:text-focused flex items-center justify-start gap-3 rounded-xl p-3">
      <Frame height={"20px"} width={"20px"} className="cursor-pointer" />
      <p>{topicName}</p>
    </div>
  );
}

export function SideBarItem({ Icon, text, className, isCollapsed, onClick }) {
  return (
    <div
      className={cn(
        "cursor-pointer hover:bg-zinc-600 hover:text-focused flex items-center justify-start gap-3 rounded-xl p-3",
        className
      )}
      onClick={onClick}
    >
      <Icon height={"24px"} width={"24px"} className=" cursor-pointer"></Icon>

      {isCollapsed ? null : <p className="">{text}</p>}
    </div>
  );
}
