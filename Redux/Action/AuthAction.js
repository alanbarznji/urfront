import axios from "axios";

export const SignUpAction = (name, password, email) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        " http://localhost:4000/api/v1/auth/signup",

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
      console.log(error, "meme");
      dispatch({
        type: "err",
        err: error.response.data,
        status: error.response.data.error.statuscode,
      });
    }
  };
};
export const LoginAction = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
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

      localStorage.setItem("Token", res.data.Token);
      console.log("dadddd");
      if (res.status == 201) {
        window.location = "/admindashboard";
      } else {
        window.alert("error");
      }
      dispatch({
        type: "LoginAction",
        payload: res.data,
        status: res.status,
      });
    } catch (error) {
      console.log("Error in cart request:", error);
window.alert("error")
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
      const res = await axios.post(
        " http://localhost:4000/api/v1/auth/check",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log("damera");

      dispatch({
        type: "CheckAction",
        payload: res.data,
        status: res.status,
      });
    } catch (error) {
      console.log("Error in cart request:", error);
window.location = "/login";
      dispatch({
        type: "err",
        err: error.response?.data || "Unknown error",
        status: error.response?.data?.error?.statuscode || 500,
      });
    }
  };
};
