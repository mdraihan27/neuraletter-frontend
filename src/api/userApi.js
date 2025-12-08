import { error } from "three";
import apiClient from "./apiClient";
import Cookies from "js-cookie";

export async function updateUser(first_name, last_name) {
  try {
    const token = Cookies.get("access_token");

    const response = await apiClient.patch(
      "/user/me",
      {
        first_name,
        last_name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      }
    );

    const data = response.data;

    if (response.status === 200) {
      localStorage.setItem("first_name", first_name);
      localStorage.setItem("last_name", last_name);
      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail || "Update failed",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}
