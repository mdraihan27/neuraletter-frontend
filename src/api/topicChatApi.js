import Cookies from "js-cookie";
import apiClient from "./apiClient";


export async function getTopicChat(topicId) {
  try {
    
    const token = Cookies.get("access_token");

    const response = await apiClient.get(
      `/topic/chat/${topicId}`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      }
    );

    const data = response.data;

    if (response.status === 200 ) {
      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail?.message || data?.detail || "Failed to fetch topic chat",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}


export async function chatWithAi(topic_id, message) {
  try {

    console.log(topic_id+" "+message )
    const token = Cookies.get("access_token");

    const response = await apiClient.post(
      `/ai/chat`,
      {
        topic_id,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      }
    );

    const data = response.data;

    if (response.status === 200 ) {
      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail?.message || data?.detail || "Failed to fetch topic chat",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}