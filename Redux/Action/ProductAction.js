import axios from "axios";

const API = axios.create({
  baseURL: " http://localhost:4000/api/v1",
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
export const GetProductAction = (queryString = "") => {
  // queryString can be "", or something like "page=1&limit=20&keyword=knife"
  return async (dispatch) => {
    dispatch({ type: "PlaceReqStart" });
    try {
      const url = queryString ? `/product?${queryString}` : `/product`;
      const res = await API.get(url);
      
      // list endpoint returns { results, paginationResult, data: [...] }
      dispatch({
        type: "ProductGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};
export const GetPlaceOneAction = (From,To) => {
  // queryString can be "", or something like "page=1&limit=20&keyword=knife"
  return async (dispatch) => { 
    try {
      const url =   `/product/product`  ;
      const res = await API.post(
        url,
        { From, To },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      // list endpoint returns { results, paginationResult, data: [...] }
      dispatch({
        type: "PlaceGet",
        payload: res.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== GET (search) =====
export const GetPlaceSearchAction = (search) => {
  // `search` is already a query string built by the caller, e.g. "keyword=steel&Active=true"
  return async (dispatch) => {
    dispatch({ type: "PlaceReqStart" });
    try {
      const res = await API.get(`/product?${search}`);
      dispatch({
        type: "PlaceGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== GET (one) =====
export const GetOneProductAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "PlaceReqStart" });
    try {
      const res = await API.get(`/product/${id}`);
      // single endpoint returns { data: {...} }
      dispatch({
        type: "PlaceGetOne",
        payload: res.data?.data || null,
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== CREATE =====
export const InsertProductAction = (formData) => {
  return async (dispatch) => {
    // console.log(data.get("image"), "data in action");
    try {
      await API.post(
        `/product`,

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      // your reducer expects list in payload, and delete returns 204 with no body,
      // so we standardize by refreshing the list after mutations:
      const list = await API.get(`/product`);
      dispatch({
        type: "ProductInsert",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== UPDATE =====
export const PutProductAction = (id, formData) => {
  // changes: any subset of { Name, Description, price, Active, ExpireDate }
  return async (dispatch) => {
    dispatch({ type: "ProductReqStart" });
    try {
      await API.put(`/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const list = await API.get(`/product`);
      dispatch({
        type: "ProductPut",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== DELETE =====
export const DeleteProductAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "PlaceReqStart" });
    try {
      await API.delete(`/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }); // backend sends 204 with no body
      const list = await API.get(`/product`);
      dispatch({
        type: "PlaceDelete",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};
export const LoveProductAction = (id,formData) => {
  return async (dispatch) => {

    dispatch({ type: "PlaceReqStart" });
    try {
      console.log("dakoda");
      await API.put(`/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });// backend sends 204 with no body
      const list = await API.get(`/product`);
      dispatch({
        type: "ProductPut",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};
