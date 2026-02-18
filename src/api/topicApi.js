import Cookies from "js-cookie";
import apiClient from "./apiClient";

export async function createTopic(title, tier, model, updateFrequencyHours = 24) {
  try {
    const token = Cookies.get("access_token");

    const response = await apiClient.post(
      "/topic/",
      { title, tier, model, update_frequency_hours: updateFrequencyHours },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      }
    );

    const data = response.data;

    if (response.status === 200 || response.status === 201) {
      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail || "Failed to create topic",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}

export async function getUserTopics() {
  try {
    const token = Cookies.get("access_token");

    const response = await apiClient.get("/topic/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    });

    const data = response.data;

    if (response.status === 200) {
      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail || "Failed to fetch topics",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}

export async function getTopicById(topicId) {
  try {
    const token = Cookies.get("access_token");

    const response = await apiClient.get(`/topic/${topicId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    });

    const data = response.data;

    if (response.status === 200) {
      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail || "Topic not found",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}

export async function deleteTopic(topicId) {
  try {
    const token = Cookies.get("access_token");

    const response = await apiClient.delete(`/topic/${topicId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    });

    const data = response.data;

    if (response.status === 200) {
      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail || "Failed to delete topic",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}

export async function updateTopic(topicId, updates) {
  try {
    const token = Cookies.get("access_token");

    const response = await apiClient.patch(
      `/topic/${topicId}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      }
    );

    const data = response.data;

    if (response.status === 200) {
      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail || "Failed to update topic",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}
