"use client";
import { useEffect, useRef, useState } from "react";
import { SquarePen, Frame, X } from "lucide-react";
import { updateTopic } from "@/api/topicApi";
import { getUpdates } from "@/api/updateApi";

export function Main({
  topicTitle,
  topicModel,
  topicDescription,
  setIsDescriptionChatVisible,
  selectedTopicId,
  setTopicTitle,
  setTopicList,
}) {
  const hasTopic = Boolean(topicTitle || topicDescription || topicModel);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(topicTitle);
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const titleInputRef = useRef(null);

  const [updates, setUpdates] = useState([]);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  // const handleSendClick = .

  // useEffect(() => {
  //   setTitleDraft(chatList);
  // }, [chatList]);

  useEffect(() => {
    const fetchUpdates = async () => {
      console.log("Use")
      if (!selectedTopicId) return;
      const response = await getUpdates(selectedTopicId);
      console.log(response);
      if (response.success && Array.isArray(response.data?.updates)) {
        setUpdates(response.data.updates);
      } else {
        setUpdates([]);
      }
    };

    fetchUpdates();

    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle, selectedTopicId]);

  const handleStartEditing = () => {
    if (!selectedTopicId || isSavingTitle) return;
    setIsEditingTitle(true);
  };

  const handleCancelEditing = () => {
    setTitleDraft(topicTitle);
    setIsEditingTitle(false);
  };

  const handleSubmitTitle = async () => {
    if (!selectedTopicId) {
      setIsEditingTitle(false);
      return;
    }

    const trimmed = titleDraft.trim();
    if (!trimmed) {
      handleCancelEditing();
      return;
    }

    if (trimmed === topicTitle) {
      setIsEditingTitle(false);
      return;
    }

    setIsSavingTitle(true);
    const response = await updateTopic(selectedTopicId, { title: trimmed });
    if (response.success) {
      setTopicTitle(trimmed);
      setTopicList((prev) =>
        prev.map((topic) =>
          topic.id === selectedTopicId ? { ...topic, title: trimmed } : topic
        )
      );
    } else {
      setTitleDraft(topicTitle);
    }
    setIsSavingTitle(false);
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitTitle();
    }
    if (event.key === "Escape") {
      handleCancelEditing();
    }
  };

  if (!hasTopic) {
    return (
      <div className="text-white flex items-center justify-center h-full text-3xl mb-40">
        <p className="text-center text-zinc-400">
          Create a new topic or select one from the sidebar to see its details.
        </p>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col gap-6 h-full text-xl">
      <div className="flex flex-col gap-6">
        <div className="flex bg-[#1f1f1f] w-full justify-between items-center p-6 rounded-xl text-white ">
          <div className="flex items-center h-full justify-start gap-4">
            <Frame />
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                onKeyDown={handleTitleKeyDown}
                className="bg-transparent outline-none border-b-2 border-focused caret-focused text-white w-full min-w-0"
                disabled={isSavingTitle}
                aria-label="Edit topic title"
              />
            ) : (
              <p className="font-medium truncate">{topicTitle}</p>
            )}
          </div>
          <SquarePen
            className="hover:text-focused cursor-pointer"
            onClick={handleStartEditing}
          />
        </div>
        <div className="bg-[#1f1f1f] p-6 flex flex-col gap-5 rounded-xl">
          <div className="flex  w-full justify-between rounded-xl items-center text-white">
            <p className="font-medium">Description</p>
          </div>
          <div>
            <p>{topicDescription}</p>
          </div>
        </div>
      </div>
      <div className=" h-5/11 flex justify-center gap-6">
        <div className="w-full flex flex-col gap-6">
          <div className="bg-linear-45 from-[#92adff30]  to-[#1f1f1f50] rounded-xl w-full px-6 py-5 flex flex-col  gap-3">
            <p className="text-sm">Last Letter Sent</p>
            <p className="text-2xl font-medium ">10 December, 25</p>
          </div>
          <div className=" rounded-xl h-full w-full px-6 py-5  leading-10 font-medium flex flex-col  bg-linear-45 from-[#1f1f1f50]  to-[#92adff30] gap-3">
            <p className="text-sm">Model Used</p>
            <div>
              <div className="flex justify-start">
                <p className="font-bold bg-linear-to-r from-orange-400 via-orange-700 to-red-500 text-transparent bg-clip-text text-2xl">
                  {topicModel}
                </p>
              </div>
              <p className="pe-6">
                Mistral Large 3, is a state-of-the-art, open-weight,
                general-purpose multimodal model with a granular
                Mixture-of-Experts architecture. It features 41B active
                parameters and 675B total parameters.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          <div className="bg-linear-45 from-[#92adff30]  to-[#1f1f1f50] rounded-xl w-full px-6 py-5 h-full text-2xl flex flex-col gap-3">
            <p className="text-sm">Upcoming Updates</p>
            <div className="flex flex-col gap-2 text-base max-h-64 overflow-y-auto pr-2">
              {updates.length === 0 && (
                <p className="text-sm text-zinc-400">No updates yet.</p>
              )}
              {updates.map((update) => {
                const createdDate = update.created_at
                  ? new Date(update.created_at).toLocaleString()
                  : "Unknown date";
                const title = update.title || "Untitled update";
                const shortTitle =
                  title.length > 40 ? `${title.slice(0, 40)}...` : title;

                return (
                  <button
                    key={update.id}
                    type="button"
                    className="w-full text-left px-3 py-2 rounded-lg bg-[#1f1f1f90] hover:bg-[#2b2b2b] transition-colors border border-transparent hover:border-focused/60"
                    onClick={() => setSelectedUpdate(update)}
                  >
                    <p className="text-xs text-zinc-400 mb-1">{createdDate}</p>
                    <p className="text-sm font-medium truncate">{shortTitle}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="text-2xl rounded-xl w-full px-6 py-5 bg-linear-45 from-[#1f1f1f50]  to-[#92adff30] flex flex-col gap-3">
            <p className="text-sm">Due Charge</p>
            <p>$3</p>
          </div>
        </div>
      </div>
      <div
        className="w-full flex justify-end"
        onClick={() => {
          setIsDescriptionChatVisible(true);
        }}
      >
        <button className="bg-focused hover:bg-hover-focused text-zinc-900 font-medium flex justify-center gap-4 px-7 py-4 cursor-pointer rounded-full text-xl items-center">
          Generate Description <SquarePen />
        </button>
      </div>

      {selectedUpdate && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-[#1f1f1f] rounded-2xl shadow-2xl max-w-xl w-full mx-4 p-6 flex flex-col gap-4 border border-[#92adff40]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-zinc-400">
                  {selectedUpdate.created_at
                    ? new Date(selectedUpdate.created_at).toLocaleString()
                    : "Unknown date"}
                </p>
                <h2 className="text-xl font-semibold">
                  {selectedUpdate.title || "Untitled update"}
                </h2>
              </div>
              <button
                type="button"
                className="p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white"
                onClick={() => setSelectedUpdate(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {Array.isArray(selectedUpdate.key_points) &&
            selectedUpdate.key_points.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-zinc-200 space-y-1">
                {selectedUpdate.key_points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-400">
                No key points available for this update.
              </p>
            )}

            {selectedUpdate.image_link && (
              <div className="mt-2">
                <img
                  src={selectedUpdate.image_link}
                  alt={selectedUpdate.title || "Update image"}
                  className="w-full h-48 object-cover rounded-xl border border-zinc-800"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
