import { error } from "three";
import apiClient from "./apiClient";
import Cookies from "js-cookie";

export async function sendVerificationCode() {

  try {
    const token = Cookies.get("access_token")
    const response = await apiClient.post(
      "/user/verification/code",
      {},
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
      error: data?.message || data?.detail || "Sending verification code failed",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}

export async function verifyVerificationCode(verification_code) {
  try {

    const token = Cookies.get("access_token")
   const response = await apiClient.post(
      "/user/verification/verify",
      {verification_code}, 
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
      error: data?.message || data?.detail || "Verification failed",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}
