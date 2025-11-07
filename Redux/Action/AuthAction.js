import axios from "axios";
import { getLocalStorageItem, setLocalStorageItem } from "@/src/utility/localStorage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export const SignUpAction = (name, password, email) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        {
          name: name,
          password: password,
          email: email,
          role: "Admin",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "SignUp",
        payload: res.data,
        status: res.status,
      });
    } catch (error) {
      console.error("SignUp error:", error);
      dispatch({
        type: "err",
        err: error.response?.data || "Unknown error",
        status: error.response?.data?.error?.statuscode || 500,
      });
    }
  };
};
export const LoginAction = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Safely store token in localStorage
      if (res.data?.Token) {
        setLocalStorageItem("Token", res.data.Token);
      }

      if (res.status === 201 || res.status === 200) {
        // Use Next.js router instead of window.location
        if (typeof window !== 'undefined') {
          window.location = "/admindashboard";
        }
      }

      dispatch({
        type: "LoginAction",
        payload: res.data,
        status: res.status,
      });
    } catch (error) {
      console.error("Login error:", error);
      dispatch({
        type: "err",
        err: error.response?.data || "Unknown error",
        status: error.response?.data?.error?.statuscode || 500,
      });
    }
  };
};
export const CheckAction = () => {
  return async (dispatch) => {
    try {
      // Safely retrieve token from localStorage
      const token = getLocalStorageItem("Token");

      const res = await axios.post(
        `${API_BASE_URL}/auth/check`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      dispatch({
        type: "CheckAction",
        payload: res.data,
        status: res.status,
      });
    } catch (error) {
      console.error("Check auth error:", error);
      dispatch({
        type: "err",
        err: error.response?.data || "Unknown error",
        status: error.response?.data?.error?.statuscode || 500,
      });

      // Redirect to login on auth failure
      if (typeof window !== 'undefined') {
        window.location = "/login";
      }
    }
  };
};
