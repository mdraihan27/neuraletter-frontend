import { error } from "three";
import apiClient from "./apiClient";
import Cookies from "js-cookie";

export async function getUpdates(topic_id) {
  try {

    console.log(topic_id)
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
      error: data?.message || data?.detail || "Failed to fetch topic chat",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}