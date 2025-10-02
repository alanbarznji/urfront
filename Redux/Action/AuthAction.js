import axios from "axios";

export const SignUpAction = (
name,
password,
email,
) => {

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
        console.log(error,'meme');
        dispatch({
          type: 'err',
          err: error.response.data,
          status: error.response.data.error.statuscode,
        });
      }
    };
  };
  export const LoginAction = ( email,password ) => {
    return async (dispatch) => {
      try {
 
        
        const res = await axios.post(
          " http://localhost:4000/api/v1/auth/login",
          {
         
              email,
              password
             
          },
          {
            headers: {
              'Content-Type': 'application/json',
 
          
            }
          },
        );
            
        localStorage.setItem("Token",res.data.Token)
 if(res.status==201){
window.location="/dashbord"
}else{
   window.alert("error")

 }
        dispatch({
          type: "LoginAction",
          payload: res.data,
          status: res.status,
        });
      } catch (error) {
        console.log("Error in cart request:", error);
        
        dispatch({
          type: 'err',
          err: error.response?.data || "Unknown error",
          status: error.response?.data?.error?.statuscode || 500,
        });
      }
    };

  };
  export const CheckAction = (   ) => {
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
        
        dispatch({
          type: 'err',
          err: error.response?.data || "Unknown error",
          status: error.response?.data?.error?.statuscode || 500,
        });
      }
    };

  };
 