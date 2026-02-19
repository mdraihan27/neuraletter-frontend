import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/imported/button";
import { useRef } from "react";

export function AiChatInput({
  buttonName,
  selfWidth,
  textareaWidth,
  isTyping,
  setIsTyping,
  handleSendClick,
  userMessage,
  setUserMessage,
}) {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const el = e.target;
    el.style.height = "auto";
    const maxHeight = 140; // px, matches max-h-[140px]
    el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";

    setIsTyping(el.value.length > 0);
  };

  const sendMessage = async () => {
    const el = textareaRef.current;
    if (!el) return;

    const message = el.value.trim();
    if (!message) return;

    if (handleSendClick) {
      await handleSendClick(message);
    }

    el.value = "";
    el.style.height = "auto";
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={`border-[#161616] border-4 bg-[#18181885] backdrop-blur-xl rounded-3xl px-4 sm:px-8 lg:px-11 shadow-[inset_0_0_0_2px_#92adff20] w-[calc(100%-1.5rem)] sm:w-4/5 lg:w-3/5 mx-auto absolute bottom-[20px] left-3 sm:left-[10%] lg:left-[20%]`}
    >
      <div className="flex flex-col justify-between  ">
        <textarea
          ref={textareaRef}
          className={`bg-[#ffffff0] w-full max-h-[140px] text-base sm:text-lg lg:text-xl text-[#ffffff75] mt-6 sm:mt-9 focus:outline-none overflow-hidden chat-scroll resize-none`}
          autoFocus
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Tell AI about the topic you want updates on..."
        ></textarea>

        <div className="flex justify-between  items-center mb-5 sm:mb-7 ">
          <div className="w-[100px] sm:w-[150px] h-[30px] flex items-center bg-transparent rounded-sm "></div>

          <Button
            className="bg-focused hover:bg-hover-focused text-black items-center rounded-[30px] flex justify-center gap-2 w-[90px] sm:w-[110px] h-[40px] sm:h-[50px] text-[15px] sm:text-[18px] font-medium cursor-pointer"
            onClick={sendMessage}
          >
            <p className="ms-1">{buttonName}</p>
            <img
              src="/images/icons/arrow_forward2.svg"
              alt="Scroll down"
              width={24}
              height={24}
              className="text-black invert"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
