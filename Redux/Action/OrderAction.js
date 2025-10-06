import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: { "Content-Type": "application/json" },
});

// helpers
const getErr = (e) =>
  e?.response?.data || { message: e?.message || "Unknown error" };
const getStatus = (e) =>
  e?.response?.data?.error?.statuscode || e?.response?.status || 500;

/**
 * Shape reminder (from your schema):
 * {
 *   Name: string,
 *   Description: string,
 *   price: number,
 *   Active?: boolean,
 *   ExpireDate?: string
 * }
 */

// ===== GET (all) =====
export const GetOrdersAction = (queryString = "") => {
  // queryString can be "", or something like "page=1&limit=20&keyword=knife"
  return async (dispatch) => {
 
    try {

      const url = queryString ? `/order?${queryString}` : `/order`;
      console.log(url);
      const res = await API.get(url);
 
      dispatch({
        type: "OrderGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== GET (search) =====
export const GetOrdersSearchAction = (search) => {
  // `search` is already a query string built by the caller, e.g. "keyword=steel&Active=true"
  return async (dispatch) => {
    dispatch({ type: "OrdersReqStart" });
    try {
      const res = await API.get(`/order?${search}`);
      dispatch({
        type: "OrdersGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== GET (one) =====
export const GetOneOrdersAction = (id) => {
  return async (dispatch) => {
 
    try {
      
      const res = await API.post(`/order/${id}`);
      // single endpoint returns { data: {...} }
      

      console.log(res.data,">>>>>>>")
      dispatch({
        type: "OrdersGetOne",
        payload: res.data ,
        status: res.status,
      });
       return res.data;
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== CREATE =====
export const InsertOrdersAction = (

  TableName

) => {
  return async (dispatch) => {
    try {
 console.log(TableName,"TableName");
     const res= await API.post(
        `/order`,
        {
      TableName
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res);
      console.log(res.data.data.id, "ressss2222");
      if(res.status!==201){
        throw new Error("Failed to create order")
   }

  await localStorage.setItem("orderId",res.data.data.id)
      // your reducer expects list in payload, and delete returns 204 with no body,
      // so we standardize by refreshing the list after mutations:
      console.log(res.data,"ressss");
      const list = await API.get(`/order`);

      dispatch({
        type: "OrderInsert",
        payload: list.data?.data || [],
        status: list.status,
      });
return true
    } catch (error) {
      window.alert("Failed to create order")
console.log(error,"faild");
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
      return false
    }
  };
};

// ===== UPDATE =====
export const PutOrdersAction = (id, changes) => {
  // changes: any subset of { Name, Description, price, Active, ExpireDate }
  return async (dispatch) => {
    dispatch({ type: "OrdersReqStart" });
    try {
      await API.put(`/order/${id}`, changes, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const list = await API.get(`/order`);
      dispatch({
        type: "OrdersPut",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== DELETE =====
export const DeleteOrdersAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "OrdersReqStart" });
    try {
      await API.delete(`/order/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }); // backend sends 204 with no body
      localStorage.removeItem("orderId");
      const list = await API.get(`/order`);
      dispatch({
        type: "OrdersDelete",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};
