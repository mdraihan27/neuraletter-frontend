import { error } from "three";
import apiClient from "./apiClient";
import Cookies from "js-cookie";

export async function sendPasswordResetCode(email) {
  try {
    const response = await apiClient.post(
      "/user/password/forget/code",
      {
        email,
      },
      {
        headers: {},
        validateStatus: () => true,
      }
    );

    const data = response.data;

    if (response.status === 200) {
      return { success: true, data };
    }

    return {
      success: false,
      error:
        data?.message || data?.detail || "Sending Password reset code failed",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}

export async function verifyPasswordResetCode(email, verification_code) {
  try {
    const response = await apiClient.post(
      "/user/password/forget/verify",
      {
        email,
        verification_code,
      },
      {
        headers: {},
        validateStatus: () => true,
      }
    );

    const data = response.data;
    console.log(response)

    if (response.status === 200 && data.access_token && data.reset_password_code) {
      Cookies.set("access_token", data.access_token, {
        expires: 30,
        secure: true,
      });

      Cookies.set("reset_code", data.reset_password_code, {
        expires: 1,
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
      error: data?.message || data?.detail || "Verification failed",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}

export async function resetPasswordUsingCode(new_password) {
  try {
    const reset_password_code = Cookies.get("reset_code")
    const token = Cookies.get("access_token")

    const response = await apiClient.patch(
      "/user/password/reset",
      {
        new_password,
        reset_password_code,
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
      Cookies.remove("reset_code")

      return { success: true, data };
    }

    return {
      success: false,
      error: data?.message || data?.detail || "Reset password failed",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
}
