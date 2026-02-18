"use client";
import Image from "next/image";
import {
  PanelLeftClose,
  Frame,
  Plus,
  Settings,
  UserRoundCog,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { deleteTopic, getTopicById, getUserTopics } from "@/api/topicApi";

export function SideBar({
  setIsProfileVisible,
  setIsCreateTopicFormVisible,
  className,
  topicList,
  setTopicList,
  setIsLoading,
  setTopicTitle,
  setTopicDescription,
  setTopicModel,
  setTopicUpdateFrequencyHours,
  setTopicNextUpdateTime,
  setIsDescriptionChatVisible,
  setSelectedTopicId,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [firstName] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("first_name") || "";
  });

  useEffect(() => {
    const getTopicList = async () => {
      setIsLoading(true)
      const response = await getUserTopics();
      console.log(response);
      if (response.success && response.data.topics) {
        setTopicList(response.data.topics);
      } else {
        setTopicList([]);
      }
      setIsLoading(false)
    };

    getTopicList();
  }, []);

  return (
    <div
      className={cn(
        "bg-[#1f1f1f] h-full px-3 py-3 text-white flex flex-col justify-between transition-all duration-200",
        isCollapsed ? "w-18" : "w-1/5",
        className
      )}
    >
      <div>
        <div
          className={cn(
            "flex justify-between pb-3 ",
            isCollapsed ? "flex-col gap-2 items-center" : "flex-row gap-0"
          )}
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
            onClick={() => setIsCreateTopicFormVisible(true)}
          />

          <div>
            <div className="flex flex-col gap-1 mt-5">
              {topicList.map((topic) => (
                <Topic
                  topicName={topic.title}
                  key={topic.id}
                  topicId={topic.id}
                  isCollapsed={isCollapsed}
                  setTopicList={setTopicList}
                  setIsLoading={setIsLoading}
                  setTopicTitle={setTopicTitle}
                  setTopicDescription={setTopicDescription}
                  setTopicModel={setTopicModel}
                  setTopicUpdateFrequencyHours={setTopicUpdateFrequencyHours}
                  setTopicNextUpdateTime={setTopicNextUpdateTime}
                  setIsDescriptionChatVisible={setIsDescriptionChatVisible}
                  setSelectedTopicId={setSelectedTopicId}
                ></Topic>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="gap-1">
        
        <SideBarItem
          Icon={UserRoundCog}
          text={firstName}
          isCollapsed={isCollapsed}
          onClick={() => setIsProfileVisible(true)}
        />
      </div>
    </div>
  );
}

export function Topic({
  topicName,
  isCollapsed,
  topicId,
  setTopicList,
  setIsLoading,
  setTopicTitle,
  setTopicModel,
  setTopicDescription,
  setTopicUpdateFrequencyHours,
  setTopicNextUpdateTime,
  setIsDescriptionChatVisible,
  setSelectedTopicId,
}) {
  const handleDeleteClick = async (id) => {
    setIsLoading(true);
    const response = await deleteTopic(id);

    if (response.success) {
      setTopicList((prev) => prev.filter((topic) => topic.id !== id));
    }
    setIsLoading(false);
  };

  const handleClick = async (id) => {
    setIsDescriptionChatVisible(false)
    setSelectedTopicId(id);
    setIsLoading(true);
    const response = await getTopicById(id);
    console.log(response)
    if (response.success && response.data.topic_info) {
      setTopicTitle(response.data.topic_info.title);
      setTopicDescription(response.data.topic_info.description);
      setTopicModel(response.data.topic_info.model);
      setTopicUpdateFrequencyHours(
        response.data.topic_info.update_frequency_hours ?? null
      );
      setTopicNextUpdateTime(response.data.topic_info.next_update_time ?? null);
    }
    setIsLoading(false);
  };
  return isCollapsed ? null : (
    <div
      className="group cursor-pointer hover:bg-zinc-600 hover:text-focused flex items-center justify-between gap-3 rounded-xl p-3"
      onClick={() => {
        handleClick(topicId);
      }}
    >
      <div className="flex items-center justify-start gap-3">
        <Frame height="20px" width="20px" />
        <p>{topicName}</p>
      </div>

      <Trash2
        className="text-white hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
           e.stopPropagation();
          handleDeleteClick(topicId);
        }}
      />
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
      <Icon
        height={"24px"}
        width={"24px"}
        className="cursor-pointer shrink-0"
      ></Icon>

      {isCollapsed ? null : <p className="">{text}</p>}
    </div>
  );
}
