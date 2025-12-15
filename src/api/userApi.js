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

export async function fetchUser() {
  try {
    const token = Cookies.get("access_token");

    const response = await apiClient.get(
      "/user/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      }
    );

    const data = response.data;
    console.log("Data:" + data)

    if (response.status === 200) {
      localStorage.setItem("email", data.user_info.email)
      localStorage.setItem("first_name", data.user_info.first_name);
      localStorage.setItem("last_name", data.user_info.last_name);
      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail || "Failed to fetch user info",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}
