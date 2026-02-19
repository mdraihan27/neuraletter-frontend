"use client";
import { useEffect, useRef, useState } from "react";
import { AiChatInput } from "@/components/ui/ai-chat-input";
import { JustSpinner } from "@/components/ui/just-spinner";
import { getTopicById } from "@/api/topicApi";
import { chatWithAi, getTopicChat } from "@/api/topicChatApi";

export function DescriptionChat({ topicId }) {
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [topicChats, setTopicChats] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchTopicTitle = async (id) => {
      if (!id) {
        setTopicTitle("");
        return;
      }

      const response = await getTopicById(id);
      if (response.success && response.data?.topic_info?.title) {
        setTopicTitle(response.data.topic_info.title);
      } else {
        setTopicTitle("");
      }
    };

    fetchTopicTitle(topicId);
  }, [topicId]);

  useEffect(() => {
    const getChat = async (topicId) => {
      const response = await getTopicChat(topicId);
      console.log("topic chat " + response.success);
      if (response.success && Array.isArray(response.data?.topic_chats)) {
        setTopicChats(response.data.topic_chats);
      } else {
        setTopicChats([]);
      }
    };

    getChat(topicId);
  }, [topicId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [topicChats, isThinking]);

  const handleSendClick = async (message) => {
    if (!message) return;

    console.log(message)

    setUserMessage("");

    setTopicChats((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return [
        ...safePrev,
        { chat_message: message, sent_by_user: true },
      ];
    });
    console.log(message + "2")
    setIsThinking(true);
    const response = await chatWithAi(topicId, message);
    console.log(response);

    if (response.success && response.data.ai_message) {
      setTopicChats((prev) => [
        ...prev,
        { chat_message: response.data.ai_message, sent_by_user: false },
      ]);
    }

    setIsThinking(false);
  };

  return (
    <div className="text-white flex flex-col gap-4 sm:gap-6 h-full text-base sm:text-lg lg:text-xl pb-20 relative">
      {/* <div className="w-full px-20 pt-8">
        <p className="text-2xl font-medium truncate">
          {topicTitle || "Topic"}
        </p>
      </div> */}
      <div
        ref={chatContainerRef}
        className="w-full px-3 pb-20 sm:px-10 lg:px-20 flex flex-col gap-4 flex-1 min-h-0 chat-scroll chat-fade py-16 sm:py-28 lg:py-40"
      >
        {topicChats.map((topicChat, index) => {
          console.log(topicChat);
          if (topicChat.sent_by_user) {
            console.log(topicChat.chat_message);
            return <UserMessage messageText={topicChat.chat_message} key={index} />;
          } else {
            console.log(topicChat.chat_message);

            return <AiMessage messageText={topicChat.chat_message} key={index} />;
          }
        })}
        {isThinking ? (
          <div className="flex justify-start w-full px-6">
            <div className="text-focused flex items-center gap-3">
              <span>Thinking</span>
              <JustSpinner />
            </div>
          </div>
        ) : null}
      </div>

      <AiChatInput
        buttonName={"Send"}
        selfWidth={900}
        textareaWidth={810}
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        handleSendClick={handleSendClick}
        userMessage={userMessage}
        setUserMessage={setUserMessage}
      />
    </div>
  );
}

export function UserMessage({ messageText }) {
  return (
    <div className="w-full flex justify-between mb-5">
      <div></div>
      <div className="bg-[#97adff60] text-sm sm:text-base lg:text-lg rounded-xl px-4 sm:px-6 py-3 max-w-[85%] sm:max-w-2/3">
        <p>{messageText}</p>
      </div>
    </div>
  );
}

export function AiMessage({ messageText }) {
  return (
    <div className="w-full  flex justify-between mb-5">
      <div className="bg-gray-700/70 text-sm sm:text-base lg:text-lg rounded-xl px-4 sm:px-6 py-3 max-w-[85%] sm:max-w-2/3">
        <p>{messageText}</p>
      </div>
      <div></div>
    </div>
  );
}
