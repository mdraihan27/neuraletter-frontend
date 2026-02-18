import apiClient from "./apiClient";
import Cookies from "js-cookie";

export async function getUpdates(topic_id) {
  try {
    const token = Cookies.get("access_token");

    const response = await apiClient.get(
      `/update/${topic_id}/`,
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
      error: data?.message || data?.detail || "Failed to fetch updates",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}