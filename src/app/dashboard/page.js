"use client";
import { LogOut, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import { SideBar } from "./sidebar";
import { logOut } from "@/lib/logOut";
import { Spinner } from "@/components/ui/spinner";
import { Profile } from "./profile";
import { cn } from "@/lib/utils";
import { Main } from "@/app/dashboard/main";
import { fetchUser } from "@/api/userApi";
import { CreateTopicForm } from "./createTopicForm";
import { DescriptionChat } from "./descriptionChat";

export default function Dashboard() {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isCreateTopicFormVisible, setIsCreateTopicFormVisible] =
    useState(false);

  const [topicList, setTopicList] = useState([]);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [topicModel, setTopicModel] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [isDescriptionChatVisible, setIsDescriptionChatVisible] =
    useState(true);

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
          isProfileVisible || isCreateTopicFormVisible
            ? "blur-[1px] brightness-60 pointer-events-none"
            : "brightness-100 blur-none pointer-events-auto"
        )}
      >
        {isLoading ? <Spinner /> : null}

        <SideBar
          setIsProfileVisible={setIsProfileVisible}
          setIsCreateTopicFormVisible={setIsCreateTopicFormVisible}
          topicList={topicList}
          setTopicList={setTopicList}
          setIsLoading={setIsLoading}
          setTopicTitle={setTopicTitle}
          setTopicDescription={setTopicDescription}
          setTopicModel={setTopicModel}
          setIsDescriptionChatVisible={setIsDescriptionChatVisible}
          setSelectedTopicId={setSelectedTopicId}
        />
        <div className="flex flex-col h-screen w-full px-8 gap-8">
          <div>
            <div
              className="text-white flex items-center justify-between gap-3 pt-6 "
              
            >
            <ArrowLeft className={cn("rounded-full bg-zinc-700 p-2 cursor-pointer hover:bg-[#97adff60]" , isDescriptionChatVisible? "block" : "invisible")} width={40} height={40} onClick={()=>{
              setIsDescriptionChatVisible(false)
            }}/>
              <div onClick={handleLogOutClick} className="flex justify-center gap-3 items-center hover:text-focused cursor-pointer ">
                <p>Log Out</p>
                <LogOut />
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            {isDescriptionChatVisible ? (
              <DescriptionChat topicId={selectedTopicId} />
            ) : (
              <Main
                topicTitle={topicTitle}
                topicDescription={topicDescription}
                topicModel={topicModel}
                setIsDescriptionChatVisible={setIsDescriptionChatVisible}
                selectedTopicId={selectedTopicId}
                setTopicTitle={setTopicTitle}
                setTopicList={setTopicList}
              />
            )}
          </div>
        </div>
      </div>
      <Profile
        className={isProfileVisible ? "block" : "hidden"}
        setIsProfileVisible={setIsProfileVisible}
      />
      <CreateTopicForm
        className={isCreateTopicFormVisible ? "block" : "hidden"}
        setIsCreateTopicFormVisible={setIsCreateTopicFormVisible}
        topicList={topicList}
        setTopicList={setTopicList}
      />
    </div>
  );
}
