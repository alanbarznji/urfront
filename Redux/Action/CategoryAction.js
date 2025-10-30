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
export const GetCategoryAction = (queryString  ) => {
  // queryString can be "", or something like "page=1&limit=20&keyword=knife"
  return async (dispatch) => {
    // dispatch({ type: "CategoryReqStart" });÷
    try {
      const url = queryString ? `/category?${queryString}` : `/category`;
      const res = await API.get(url);
      
      // list endpoint returns { results, paginationResult, data: [...] }
      dispatch({
        type: "CategoryGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};
export const GetCategoryOneAction = (From,To) => {
  // queryString can be "", or something like "page=1&limit=20&keyword=knife"
  return async (dispatch) => { 
    try {
      const url =   `/category/category`  ;
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
        type: "CategoryGet",
        payload: res.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== GET (search) =====
export const GetCategorySearchAction = (search) => {
  // `search` is already a query string built by the caller, e.g. "keyword=steel&Active=true"
  return async (dispatch) => {
    dispatch({ type: "CategoryReqStart" });
    try {
      const res = await API.get(`/category?${search}`);
      dispatch({
        type: "CategoryGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== GET (one) =====
export const GetOneCategoryAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "CategoryReqStart" });
    try {
      const res = await API.get(`/category/${id}`);
      // single endpoint returns { data: {...} }
      dispatch({
        type: "CategoryGetOne",
        payload: res.data?.data || null,
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== CREATE =====
export const InsertCategoryAction = (
    name,
    icon,
    namear
) => {
  return async (dispatch) => {
    dispatch({ type: "CategoryReqStart" });
    try {
      console.log(name,icon,"name,icon");
      await API.post(`/category`, {
        name,
        icon,
        namear
      });
      // your reducer expects list in payload, and delete returns 204 with no body,
      // so we standardize by refreshing the list after mutations:
      const list = await API.get(`/category`);
      dispatch({
        type: "CategoryInsert",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== UPDATE =====
export const PutCategoryAction = (id, changes) => {
  // changes: any subset of { Name, Description, price, Active, ExpireDate }
  return async (dispatch) => {
    dispatch({ type: "CategoryReqStart" });
    try {
      await API.put(`/category/${id}`, changes, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const list = await API.get(`/category`);
      dispatch({
        type: "CategoryPut",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== DELETE =====
export const DeleteCategoryAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "CategoryReqStart" });
    try {
      await API.delete(`/category/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }); // backend sends 204 with no body
      const list = await API.get(`/category`);
      dispatch({
        type: "CategoryDelete",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};
