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

      const url = queryString ? `/orders?${queryString}` : `/orders`;
      console.log(url);
      const res = await API.get(url);
      // list endpoint returns { results, paginationResult, data: [...] }
  
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

// ===== GET (search) =====
export const GetOrdersSearchAction = (search) => {
  // `search` is already a query string built by the caller, e.g. "keyword=steel&Active=true"
  return async (dispatch) => {
    dispatch({ type: "OrdersReqStart" });
    try {
      const res = await API.get(`/orders?${search}`);
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
      
      const res = await API.post(`/orders/${id}`);
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
Cop,
Discount,

) => {
  return async (dispatch) => {
 
    try {
      console.log(Cop,Discount);
      await API.post(
        `/orders`,
        {
          Cop,
          Discount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      // your reducer expects list in payload, and delete returns 204 with no body,
      // so we standardize by refreshing the list after mutations:
      const list = await API.get(`/orders`);
      dispatch({
        type: "OrdersInsert",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== UPDATE =====
export const PutOrdersAction = (id, changes) => {
  // changes: any subset of { Name, Description, price, Active, ExpireDate }
  return async (dispatch) => {
    dispatch({ type: "OrdersReqStart" });
    try {
      await API.put(`/orders/${id}`, changes, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const list = await API.get(`/orders`);
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
      await API.delete(`/orders/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }); // backend sends 204 with no body
      const list = await API.get(`/orders`);
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
