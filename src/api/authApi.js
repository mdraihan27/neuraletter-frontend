import { error } from "three";
import apiClient from "./apiClient";
import Cookies from "js-cookie";

export async function login(email, password) {
  try {
    const response = await apiClient.post(
      "/auth/login",
      { email, password },
      {
        validateStatus: () => true, 
      }
    );

    const data = response.data;

    if (response.status === 200 && data.access_token) {
      Cookies.set("access_token", data.access_token, {
        expires: 30,
        secure: true,
      });

      if (data.user_info) {
        const { email, first_name, last_name } = data.user_info;

        localStorage.setItem("email", email);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
      }

      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail || "Login failed",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}

export async function signup(first_name, last_name, email, password) {
  try {
    const response = await apiClient.post(
      "/auth/signup",
      { first_name, last_name, email, password },
      {
        validateStatus: () => true, 
      }
    );

    const data = response.data;

    if (response.status === 201 && data?.access_token) {
      Cookies.set("access_token", data.access_token, {
        expires: 30,
        secure: true,
      });

      if (data.user_info) {
        const { email, first_name, last_name } = data.user_info;

        localStorage.setItem("email", email);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
      }

      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail || "Signup failed",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}

export async function googleLogin(email, password) {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/login`;
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "Network error",
    };
  }
}
