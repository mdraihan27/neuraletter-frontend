import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { createTopic } from "@/api/topicApi";

export function CreateTopicForm({ className, setIsCreateTopicFormVisible, topicList, setTopicList }) {
  const [topicTitle, setTopicTitle] = useState("");
  const [topicTier, setTopicTier] = useState("");
  const [topicModel, setTopicModel] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleCreateClick = async () => {
    setIsLoading(true);
    const result = await createTopic(topicTitle, topicTier, topicModel);

    if (result.success) {
      setIsError(false);
      setMessage(result.data.message);
     setTopicList(prev => [...prev, result.data.topic]);
    } else {
      setIsError(true);
      setMessage(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 z-[100]">
          <Spinner />
        </div>
      )}

      <div
        className={cn(
          "absolute left-2/5 top-1/5 z-10 bg-zinc-800 rounded-xl shadow-2xl text-white p-4 shadow-black/50",
          className
        )}
      >
        <div className="flex w-full justify-between">
          <p className="font-medium text-xl">Create Topic</p>
          <Plus
            className="rotate-45 text-zinc-600 hover:text-red-300 cursor-pointer"
            onClick={() => setIsCreateTopicFormVisible(false)}
          />
        </div>

        <div className="w-full p-3 pt-8 flex flex-col gap-4">
          <div className="border border-zinc-400 rounded-md flex flex-col gap-1 px-3 py-2">
            <p className="text-xs">Topic Title</p>
            <input
              className="focus:outline-none text-lg"
              type="text"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
            />
          </div>

          <div className="border border-zinc-400 rounded-md flex flex-col gap-1 px-3 py-2">
            <p className="text-xs">Topic Tier</p>
            <select
              className="bg-transparent focus:outline-none text-lg"
              value={topicTier}
              onChange={(e) => setTopicTier(e.target.value)}
            >
              <option value="" disabled hidden className="">
                Select a tier
              </option>
              <option className="text-black" value="free">
                Free
              </option>
              <option className="text-black" value="pro">
                Pro
              </option>
              <option className="text-black" value="pay_as_you_go">
                Pay as you go
              </option>
            </select>
          </div>

          <div className="border border-zinc-400 rounded-md flex flex-col gap-1 px-3 py-2">
            <p className="text-xs">Topic Model</p>
            <select
              className="bg-transparent focus:outline-none text-lg"
              value={topicModel}
              onChange={(e) => setTopicModel(e.target.value)}
            >
              <option value="" disabled hidden>
                Select a model
              </option>
              <option className="text-black" value="mistral-large-2512">
                Mistral Large 3
              </option>
              <option className="text-black" value="gpt-4o">
                Mistral Small 2
              </option>
              <option className="text-black" value="claude-3.5-sonnet">
                Gemini 2.5 Flash
              </option>
            </select>
          </div>

          <div className="flex justify-between items-center pt-4">
            <p
              className={cn(
                "text-sm",
                isError ? "text-red-300" : "text-green-400"
              )}
            >
              {message}
            </p>
            <button
              className="px-3 py-2 bg-focused text-zinc-800 rounded-sm hover:bg-hover-focused"
              onClick={handleCreateClick}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
