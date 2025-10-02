import axios from "axios";

const API = axios.create({
  baseURL: " http://localhost:3000/api/v1",
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
export const GetOfferAction = (queryString = "") => {
  // queryString can be "", or something like "page=1&limit=20&keyword=knife"
  return async (dispatch) => {
    dispatch({ type: "OfferReqStart" });
    try {
      const url = queryString ? `/offer?${queryString}` : `/offer`;
      const res = await API.get(url );
      // list endpoint returns { results, paginationResult, data: [...] }
      dispatch({
        type: "OfferGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};
export const GetOfferFieldsAction = (queryString = "") => {
  // queryString can be "", or something like "page=1&limit=20&keyword=knife"
  return async (dispatch) => {
    dispatch({ type: "OfferReqStart" });
    try {
      const url = queryString ? `/offer?${queryString}` : `/offer`;
      const res = await API.get(url );
      // list endpoint returns { results, paginationResult, data: [...] }
      dispatch({
        type: "OfferGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== GET (search) =====
export const GetOfferSearchAction = (search) => {
  // `search` is already a query string built by the caller, e.g. "keyword=steel&Active=true"
  return async (dispatch) => {
    dispatch({ type: "OfferReqStart" });
    try {
      const res = await API.get(`/offer?${search}`);
      dispatch({
        type: "OfferGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== GET (one) =====
export const GetOneOfferAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "OfferReqStart" });
    try {
      const res = await API.get(`/offer/${id}`);
      // single endpoint returns { data: {...} }
      dispatch({
        type: "OfferGetOne",
        payload: res.data?.data || null,
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== CREATE =====
export const InsertOfferAction = ({
  Name,
  Description,
  price,
  Active = false,
  ExpireDate = "",
}) => {
  return async (dispatch) => {
    dispatch({ type: "OfferReqStart" });
    try {
      await API.post(
        `/offer`,
        {
          Name,
          Description,
          price,
          Active,
          ExpireDate,
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
      const list = await API.get(`/offer`);
      dispatch({
        type: "OfferInsert",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== UPDATE =====
export const PutOfferAction = (id, changes) => {
  // changes: any subset of { Name, Description, price, Active, ExpireDate }
  return async (dispatch) => {
    dispatch({ type: "OfferReqStart" });
    try {
      await API.put(`/offer/${id}`, changes, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const list = await API.get(`/offer`);
      dispatch({
        type: "OfferPut",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== DELETE =====
export const DeleteOfferAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "OfferReqStart" });
    try {
      await API.delete(`/offer/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }); // backend sends 204 with no body
      const list = await API.get(`/offer`);
      dispatch({
        type: "OfferDelete",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};
