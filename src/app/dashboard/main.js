"use client";
import { useEffect, useRef, useState } from "react";
import { SquarePen, Frame, X, Plus } from "lucide-react";
import { updateTopic } from "@/api/topicApi";
import { getUpdates } from "@/api/updateApi";

export function Main({
  topicTitle,
  topicModel,
  topicDescription,
  topicUpdateFrequencyHours,
  topicNextUpdateTime,
  setIsDescriptionChatVisible,
  selectedTopicId,
  setTopicTitle,
  setTopicUpdateFrequencyHours,
  setTopicNextUpdateTime,
  setTopicList,
  setIsCreateTopicFormVisible,
}) {
  const hasTopic = Boolean(topicTitle || topicDescription || topicModel);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(topicTitle);
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const titleInputRef = useRef(null);

  const [isEditingFrequency, setIsEditingFrequency] = useState(false);
  const [frequencyDraft, setFrequencyDraft] = useState(
    topicUpdateFrequencyHours != null ? String(topicUpdateFrequencyHours) : ""
  );
  const [isSavingFrequency, setIsSavingFrequency] = useState(false);
  const frequencyInputRef = useRef(null);

  const [timeToNextUpdate, setTimeToNextUpdate] = useState(null);

  const [updateBatches, setUpdateBatches] = useState([]);
  const [isLoadingUpdates, setIsLoadingUpdates] = useState(false);
  const [updatesError, setUpdatesError] = useState(null);
  const [activeBatch, setActiveBatch] = useState(null);

  const latestUpdateDate = null;

  const formatDateTime = (value) => {
    if (value == null) return null;

    const epochMs = normalizeEpochMs(value);
    if (epochMs != null) {
      const date = new Date(epochMs);
      if (!Number.isNaN(date.getTime())) {
        return new Intl.DateTimeFormat(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date);
      }
    }

    if (typeof value === "string") {
      const asDate = new Date(value);
      if (!Number.isNaN(asDate.getTime())) {
        return new Intl.DateTimeFormat(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(asDate);
      }
    }

    return null;
  };

  const toArray = (maybeArray) => (Array.isArray(maybeArray) ? maybeArray : []);

  const normalizeUpdatesPayload = (data) => {
    const topLevelCandidates =
      data?.batches ??
      data?.update_batches ??
      data?.sent_updates ??
      data?.letters ??
      data?.results ??
      data?.updates ??
      [];

    const candidates = toArray(topLevelCandidates);
    if (candidates.length === 0) {
      return [];
    }

    const first = candidates[0];

    const looksLikeBatch = (item) => {
      if (!item || typeof item !== "object") return false;
      return (
        Array.isArray(item.updates) ||
        Array.isArray(item.items) ||
        Array.isArray(item.entries) ||
        Array.isArray(item.content)
      );
    };

    const normalizeUpdateItem = (item) => {
      if (item == null) return null;
      if (typeof item === "string") {
        return { heading: "Update", body: item, link: null };
      }
      if (typeof item !== "object") {
        return { heading: "Update", body: String(item), link: null };
      }

      const heading = item.heading ?? item.title ?? item.headline ?? "Update";
      const body = item.body ?? item.text ?? item.summary ?? item.content ?? "";
      const link = item.link ?? item.url ?? item.source_url ?? null;
      return { heading, body, link };
    };

    if (looksLikeBatch(first)) {
      return candidates.map((batch, index) => {
        const batchId =
          batch.id ??
          batch.batch_id ??
          batch.update_batch_id ??
          batch.sent_at ??
          batch.created_at ??
          index;
        const sentAt = batch.sent_at ?? batch.created_at ?? batch.date ?? null;
        const label =
          batch.label ??
          batch.name ??
          formatDateTime(sentAt) ??
          `Batch ${index + 1}`;

        const rawUpdates =
          batch.updates ?? batch.items ?? batch.entries ?? batch.content ?? [];
        const updates = toArray(rawUpdates)
          .map(normalizeUpdateItem)
          .filter(Boolean);

        return { id: String(batchId), label, sentAt, updates };
      });
    }

    const batchKeyFromItem = (item) => {
      if (!item || typeof item !== "object") return null;
      return (
        item.batch_id ??
        item.update_batch_id ??
        item.batchId ??
        item.updateBatchId ??
        null
      );
    };

    const batchSentAtFromItem = (item) => {
      if (!item || typeof item !== "object") return null;
      return (
        item.batch_sent_at ??
        item.batch_created_at ??
        item.sent_at ??
        item.created_at ??
        item.date ??
        null
      );
    };

    const shouldGroupByBatchId = candidates.some((item) => batchKeyFromItem(item) != null);
    if (shouldGroupByBatchId) {
      const grouped = new Map();

      for (const item of candidates) {
        const rawKey = batchKeyFromItem(item) ?? "unknown";
        const key = String(rawKey);
        const sentAt = batchSentAtFromItem(item);

        if (!grouped.has(key)) {
          grouped.set(key, {
            id: key,
            label: formatDateTime(sentAt) ?? `Batch ${key}`,
            sentAt: sentAt ?? null,
            updates: [],
          });
        }

        const group = grouped.get(key);
        if (group.sentAt == null && sentAt != null) {
          group.sentAt = sentAt;
          group.label = formatDateTime(sentAt) ?? group.label;
        }

        const normalized = normalizeUpdateItem(item);
        if (normalized) group.updates.push(normalized);
      }

      const asArray = Array.from(grouped.values());
      asArray.sort((a, b) => {
        const aTime = normalizeEpochMs(a.sentAt);
        const bTime = normalizeEpochMs(b.sentAt);
        if (aTime != null && bTime != null) return bTime - aTime;
        if (aTime != null) return -1;
        if (bTime != null) return 1;
        return String(b.id).localeCompare(String(a.id));
      });

      return asArray;
    }

    const updates = candidates.map(normalizeUpdateItem).filter(Boolean);
    return [{ id: "updates", label: "Sent Updates", sentAt: null, updates }];
  };

  useEffect(() => {
    let cancelled = false;

    const loadUpdates = async () => {
      if (!selectedTopicId) {
        setUpdateBatches([]);
        setUpdatesError(null);
        setIsLoadingUpdates(false);
        return;
      }

      setIsLoadingUpdates(true);
      setUpdatesError(null);

      const response = await getUpdates(selectedTopicId);
      if (cancelled) return;

      if (response.success) {
        setUpdateBatches(normalizeUpdatesPayload(response.data));
      } else {
        setUpdateBatches([]);
        setUpdatesError(response.error || "Failed to fetch updates");
      }

      setIsLoadingUpdates(false);
    };

    loadUpdates();
    return () => {
      cancelled = true;
    };
  }, [selectedTopicId]);

  // const handleSendClick = .

  // useEffect(() => {
  //   setTitleDraft(chatList);
  // }, [chatList]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }

    if (isEditingFrequency && frequencyInputRef.current) {
      frequencyInputRef.current.focus();
      frequencyInputRef.current.select();
    }
  }, [isEditingTitle, isEditingFrequency, selectedTopicId]);

  const normalizeEpochMs = (value) => {
    if (value == null) return null;
    const asNumber = typeof value === "string" ? Number(value) : value;
    if (!Number.isFinite(asNumber)) return null;
    // Heuristic: seconds are ~1e9-1e10, ms are ~1e12-1e13.
    return asNumber < 1e12 ? asNumber * 1000 : asNumber;
  };

  useEffect(() => {
    const targetTime = normalizeEpochMs(topicNextUpdateTime);
    if (targetTime == null) {
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeToNextUpdate("00h 00m 00s");
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n) => String(n).padStart(2, "0");
      setTimeToNextUpdate(`${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, [topicNextUpdateTime]);

  const handleStartEditing = () => {
    if (!selectedTopicId || isSavingTitle) return;
    setTitleDraft(topicTitle);
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

  const handleStartEditingFrequency = () => {
    if (!selectedTopicId || isSavingFrequency) return;
    setFrequencyDraft(
      topicUpdateFrequencyHours != null ? String(topicUpdateFrequencyHours) : ""
    );
    setIsEditingFrequency(true);
  };

  const handleCancelEditingFrequency = () => {
    setFrequencyDraft(
      topicUpdateFrequencyHours != null ? String(topicUpdateFrequencyHours) : ""
    );
    setIsEditingFrequency(false);
  };

  const handleSubmitFrequency = async () => {
    if (!selectedTopicId) {
      setIsEditingFrequency(false);
      return;
    }

    const parsed = Number.parseInt(frequencyDraft, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      handleCancelEditingFrequency();
      return;
    }

    if (parsed === topicUpdateFrequencyHours) {
      setIsEditingFrequency(false);
      return;
    }

    setIsSavingFrequency(true);
    const response = await updateTopic(selectedTopicId, {
      update_frequency_hours: parsed,
    });

    if (response.success) {
      setTopicUpdateFrequencyHours(parsed);
      setTopicList((prev) =>
        prev.map((topic) =>
          topic.id === selectedTopicId
            ? { ...topic, update_frequency_hours: parsed }
            : topic
        )
      );

      const nextTime =
        response.data?.topic_info?.next_update_time ??
        response.data?.topic?.next_update_time ??
        null;
      if (nextTime != null) {
        setTopicNextUpdateTime(nextTime);
      }
    } else {
      setFrequencyDraft(
        topicUpdateFrequencyHours != null
          ? String(topicUpdateFrequencyHours)
          : ""
      );
    }

    setIsSavingFrequency(false);
    setIsEditingFrequency(false);
  };

  const handleFrequencyKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitFrequency();
    }
    if (event.key === "Escape") {
      handleCancelEditingFrequency();
    }
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
      <div className="text-white flex flex-col items-center justify-center h-full text-xl sm:text-2xl lg:text-3xl mb-20 sm:mb-40 px-4 gap-5 sm:gap-6">
        <p className="text-center text-zinc-400">
          Create a new topic or select one from the sidebar to see its details.
        </p>
        <button
          type="button"
          className="bg-focused hover:bg-hover-focused text-zinc-900 font-medium px-6 py-3 rounded-full cursor-pointer text-base sm:text-lg flex items-center gap-2"
          onClick={() => setIsCreateTopicFormVisible(true)}
        >
          <Plus className="w-5 h-5" /> Create Topic
        </button>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col gap-4 sm:gap-6 h-full text-base sm:text-lg lg:text-xl overflow-y-auto lg:overflow-hidden custom-scrollbar pb-4">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex bg-[#1f1f1f] w-full justify-between items-center p-4 sm:p-6 rounded-xl text-white ">
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
        <div className="bg-[#1f1f1f] p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 rounded-xl">
          <div className="flex  w-full justify-between rounded-xl items-center text-white">
            <p className="font-medium">Description</p>
          </div>
          <div>
            <p>{topicDescription}</p>
          </div>
        </div>
      </div>
      <div className="lg:h-5/11 lg:min-h-0 flex flex-col lg:flex-row justify-center gap-4 sm:gap-6 shrink-0 lg:shrink">
        <div className="w-full lg:h-full lg:min-h-0 flex flex-col gap-4 sm:gap-6">
          {/* <div className="bg-linear-45 from-[#92adff30]  to-[#1f1f1f50] rounded-xl w-full px-6 py-5 flex flex-col  gap-3">
            <p className="text-sm">Last Letter Sent</p>
            <p className="text-2xl font-medium ">
              {latestUpdateDate || "No letters sent yet"}
            </p>
          </div> */}
          <div className="rounded-xl w-full px-4 sm:px-6 py-4 sm:py-5 leading-8 sm:leading-10 font-medium flex flex-col bg-linear-45 from-[#1f1f1f50] to-[#92adff30] gap-3">
            <p className="text-sm">Model Used</p>
            <div>
              <div className="flex justify-start">
                <p className="font-bold bg-linear-to-r from-orange-400 via-orange-700 to-red-500 text-transparent bg-clip-text text-2xl">
                  {topicModel}
                </p>
              </div>
              {/* <p className="pe-6">
                Mistral Large 3, is a state-of-the-art, open-weight,
                general-purpose multimodal model with a granular
                Mixture-of-Experts architecture. It features 41B active
                parameters and 675B total parameters.
              </p> */}
            </div>
          </div>

          <div className="lg:flex-1 lg:min-h-0 rounded-xl w-full px-4 sm:px-6 py-4 sm:py-5 bg-linear-45 from-[#1f1f1f50] to-[#92adff30] flex flex-col gap-4 max-h-[280px] lg:max-h-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Sent Updates</p>
              <p className="text-sm text-zinc-300">
                {isLoadingUpdates
                  ? "Loading..."
                  : updateBatches.reduce(
                    (count, batch) => count + (batch.updates?.length || 0),
                    0
                  )}
              </p>
            </div>

            {updatesError ? (
              <p className="text-zinc-300 text-sm">{updatesError}</p>
            ) : null}

            {!isLoadingUpdates && updateBatches.length === 0 ? (
              <p className="text-zinc-300 text-sm">No sent updates yet.</p>
            ) : null}

            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pe-2">
              <div className="flex flex-col gap-3">
                {updateBatches.map((batch) => (
                  <button
                    key={batch.id}
                    type="button"
                    onClick={() => setActiveBatch(batch)}
                    className="text-left w-full rounded-xl bg-[#1f1f1f] hover:bg-zinc-700/50 transition-colors px-4 py-4 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{batch.label}</p>
                      <p className="text-sm text-zinc-300">
                        {batch.updates?.length || 0} updates
                      </p>
                    </div>
                    <div className="text-focused text-sm">View</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 sm:gap-6 lg:h-full">
          <div className="text-xl sm:text-2xl rounded-xl w-full px-4 sm:px-6 py-4 sm:py-5 bg-linear-45 from-[#1f1f1f50]  to-[#92adff30] flex flex-col gap-3">
            <p className="text-sm">Next Update In</p>
            <p>
              {topicNextUpdateTime != null
                ? timeToNextUpdate || "Calculating..."
                : "No updates scheduled"}
            </p>
          </div>

          <div className="text-xl sm:text-2xl rounded-xl w-full px-4 sm:px-6 py-4 sm:py-5 bg-linear-45 from-[#1f1f1f50]  to-[#92adff30] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm">Update Frequency (Hours)</p>
              <SquarePen
                className="hover:text-focused cursor-pointer"
                onClick={handleStartEditingFrequency}
              />
            </div>
            {isEditingFrequency ? (
              <input
                ref={frequencyInputRef}
                value={frequencyDraft}
                onChange={(e) => setFrequencyDraft(e.target.value)}
                onKeyDown={handleFrequencyKeyDown}
                className="bg-transparent outline-none border-b-2 border-focused caret-focused text-white w-full min-w-0"
                disabled={isSavingFrequency}
                inputMode="numeric"
                type="number"
                min={1}
                step={1}
                aria-label="Edit update frequency hours"
              />
            ) : (
              <p>
                {topicUpdateFrequencyHours != null
                  ? `${topicUpdateFrequencyHours} hours`
                  : "Not set"}
              </p>
            )}
          </div>
        </div>
      </div>

      {activeBatch ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close updates"
            onClick={() => setActiveBatch(null)}
          />
          <div className="relative w-[min(900px,92vw)] max-h-[85vh] bg-zinc-800 rounded-xl shadow-2xl shadow-black/50 border border-zinc-700 overflow-hidden flex flex-col">
            <div className="px-6 py-5 flex items-start justify-between gap-4 border-b border-zinc-700">
              <div className="min-w-0">
                <p className="text-xl font-medium truncate">{activeBatch.label}</p>
                <p className="text-sm text-zinc-300">
                  {activeBatch.updates?.length || 0} updates
                </p>
              </div>
              <button
                type="button"
                className="hover:text-focused"
                onClick={() => setActiveBatch(null)}
                aria-label="Close"
              >
                <X />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6">
              <div className="flex flex-col gap-4">
                {(activeBatch.updates || []).map((update, index) => (
                  <div
                    key={`${activeBatch.id}-${index}`}
                    className="rounded-xl bg-linear-45 from-[#1f1f1f50] to-[#92adff30] px-5 py-4"
                  >
                    <p className="font-medium">{update.heading}</p>
                    {update.body ? (
                      <p className="text-zinc-200 text-base mt-2 leading-relaxed">
                        {update.body}
                      </p>
                    ) : null}
                    {update.link ? (
                      <a
                        href={update.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex mt-3 text-focused border-b border-focused text-sm"
                      >
                        Open link
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-transparent lg:static lg:bg-transparent lg:backdrop-blur-none lg:p-0 flex justify-center sm:justify-end"
      >
        <button className="bg-focused hover:bg-hover-focused text-zinc-900 font-medium flex justify-center gap-3 sm:gap-4 px-5 sm:px-7 py-3 sm:py-4 cursor-pointer rounded-full text-base sm:text-xl items-center w-full sm:w-auto"
          onClick={() => {
            setIsDescriptionChatVisible(true);
          }}
        >
          Generate Description <SquarePen />
        </button>
      </div>

    </div>
  );
}
