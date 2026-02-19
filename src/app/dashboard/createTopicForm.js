"use client";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { createTopic } from "@/api/topicApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/imported/select";

const AVAILABLE_TIERS = [{ value: "free", label: "Free" }];
const AVAILABLE_MODELS = [
  { value: "mistral-large-2512", label: "Mistral Large 3" },
];

export function CreateTopicForm({ className, setIsCreateTopicFormVisible, topicList, setTopicList, onTopicCreated }) {
  const [topicTitle, setTopicTitle] = useState("");
  const [topicTier, setTopicTier] = useState(AVAILABLE_TIERS[0].value);
  const [topicModel, setTopicModel] = useState(AVAILABLE_MODELS[0].value);
  const [updateFrequencyHours, setUpdateFrequencyHours] = useState("24");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleCreateClick = async () => {
    const parsedHours = Number.parseInt(updateFrequencyHours, 10);
    if (!Number.isFinite(parsedHours) || parsedHours <= 0) {
      setIsError(true);
      setMessage("Please enter update frequency in hours.");
      return;
    }

    const update_frequency_hours = parsedHours;

    setIsLoading(true);
    const result = await createTopic(
      topicTitle,
      topicTier,
      topicModel,
      update_frequency_hours
    );

    if (result.success) {
      setIsError(false);
      setMessage(result.data.message);
      const newTopic = result.data.topic;
      setTopicList(prev => [newTopic, ...prev]);
      setIsCreateTopicFormVisible(false);
      if (onTopicCreated) onTopicCreated(newTopic);
    } else {
      setIsError(true);
      setMessage(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className={cn("fixed inset-0 z-50", className)}>
      {isLoading && (
        <div className="fixed inset-0 z-100">
          <Spinner />
        </div>
      )}

      <button
        type="button"
        className="absolute inset-0 z-0"
        aria-label="Close create topic"
        onClick={() => setIsCreateTopicFormVisible(false)}
      />
      <div
        className={cn(
          "absolute z-10 bg-zinc-800 rounded-xl shadow-2xl text-white p-4 shadow-black/50",
          "w-[calc(100%-2rem)] left-4 top-1/2 -translate-y-1/2",
          "sm:w-3/7 sm:left-2/7 sm:top-1/5 sm:translate-y-0"
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
            <Select value={topicTier} onValueChange={setTopicTier}>
              <SelectTrigger className="bg-transparent p-0 h-auto text-lg text-left">
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 text-white border-zinc-400">
                {AVAILABLE_TIERS.map((tier) => (
                  <SelectItem
                    className="cursor-pointer"
                    value={tier.value}
                    key={tier.value}
                  >
                    {tier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border border-zinc-400 rounded-md flex flex-col gap-1 px-3 py-2">
            <p className="text-xs">Topic Model</p>
            <Select value={topicModel} onValueChange={setTopicModel}>
              <SelectTrigger className="bg-transparent p-0 h-auto text-lg text-left">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 text-white border-zinc-400">
                {AVAILABLE_MODELS.map((model) => (
                  <SelectItem
                    className="cursor-pointer"
                    value={model.value}
                    key={model.value}
                  >
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border border-zinc-400 rounded-md flex flex-col gap-1 px-3 py-2">
            <p className="text-xs">Updates Every (Hours)</p>
            <input
              className="focus:outline-none text-lg bg-transparent"
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              value={updateFrequencyHours}
              onChange={(e) => setUpdateFrequencyHours(e.target.value)}
            />
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
              className="px-3 py-2 bg-focused text-zinc-800 rounded-sm hover:bg-hover-focused cursor-pointer"
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
