"use client";
import { LogOut, ArrowLeft, Menu } from "lucide-react";
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
  const [topicUpdateFrequencyHours, setTopicUpdateFrequencyHours] =
    useState(null);
  const [topicNextUpdateTime, setTopicNextUpdateTime] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [isDescriptionChatVisible, setIsDescriptionChatVisible] =
    useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const shouldShowDescriptionChat =
    Boolean(isDescriptionChatVisible) && selectedTopicId != null;

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
          setTopicUpdateFrequencyHours={setTopicUpdateFrequencyHours}
          setTopicNextUpdateTime={setTopicNextUpdateTime}
          setIsDescriptionChatVisible={setIsDescriptionChatVisible}
          setSelectedTopicId={setSelectedTopicId}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex flex-col h-screen w-full px-4 sm:px-6 lg:px-8 gap-4 sm:gap-6 lg:gap-8">
          <div>
            <div
              className="text-white flex items-center justify-between gap-3 pt-4 sm:pt-6 "
            >
              <div className="w-10 sm:w-40 flex justify-start items-center gap-2">
                {/* Mobile: show back arrow on chat page, hamburger otherwise */}
                {shouldShowDescriptionChat ? (
                  <button
                    className="lg:hidden p-2 hover:bg-zinc-700 rounded-full cursor-pointer"
                    onClick={() => setIsDescriptionChatVisible(false)}
                    aria-label="Back to topic"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                ) : (
                  <button
                    className="lg:hidden p-2 hover:bg-zinc-700 rounded-full cursor-pointer"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
                {/* Desktop: back arrow */}
                <ArrowLeft
                  className={cn(
                    "rounded-full bg-zinc-700 p-2 cursor-pointer hover:bg-[#97adff60] shrink-0 hidden lg:block",
                    shouldShowDescriptionChat ? "lg:block" : "invisible"
                  )}
                  width={40}
                  height={40}
                  onClick={() => {
                    setIsDescriptionChatVisible(false);
                  }}
                />
              </div>

              <div className="flex-1 flex justify-center min-w-0">
                {shouldShowDescriptionChat ? (
                  <p className="font-medium truncate max-w-full text-sm sm:text-base">{topicTitle || "Topic"}</p>
                ) : null}
              </div>

              <div className="w-10 sm:w-40 flex justify-end">
                <div
                  onClick={handleLogOutClick}
                  className="flex justify-center gap-3 items-center hover:text-focused cursor-pointer "
                >
                  <p className="hidden sm:block">Log Out</p>
                  <LogOut className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            {shouldShowDescriptionChat ? (
              <DescriptionChat topicId={selectedTopicId} />
            ) : (
              <Main
                topicTitle={topicTitle}
                topicDescription={topicDescription}
                topicModel={topicModel}
                topicUpdateFrequencyHours={topicUpdateFrequencyHours}
                topicNextUpdateTime={topicNextUpdateTime}
                setIsDescriptionChatVisible={setIsDescriptionChatVisible}
                selectedTopicId={selectedTopicId}
                setTopicTitle={setTopicTitle}
                setTopicUpdateFrequencyHours={setTopicUpdateFrequencyHours}
                setTopicNextUpdateTime={setTopicNextUpdateTime}
                setTopicList={setTopicList}
                setIsCreateTopicFormVisible={setIsCreateTopicFormVisible}
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
        onTopicCreated={(topic) => {
          setSelectedTopicId(topic.id);
          setTopicTitle(topic.title || "");
          setTopicDescription(topic.description || "");
          setTopicModel(topic.model || "");
          setTopicUpdateFrequencyHours(topic.update_frequency_hours ?? null);
          setTopicNextUpdateTime(topic.next_update_time ?? null);
          setIsDescriptionChatVisible(false);
        }}
      />
    </div>
  );
}
