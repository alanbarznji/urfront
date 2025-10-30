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
export const GetReviewAction = (queryString  ) => {
  // queryString can be "", or something like "page=1&limit=20&keyword=knife"
  return async (dispatch) => {
    // dispatch({ type: "ReviewReqStart" });÷
    try {
      const url = queryString ? `/review?${queryString}` : `/review`;
      const res = await API.get(url);
      
      // list endpoint returns { results, paginationResult, data: [...] }
      dispatch({
        type: "ReviewGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};
export const GetReviewOneAction = (From,To) => {
  // queryString can be "", or something like "page=1&limit=20&keyword=knife"
  return async (dispatch) => { 
    try {
      const url =   `/review/review`  ;
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
        type: "ReviewGet",
        payload: res.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== GET (search) =====
export const GetReviewSearchAction = (search) => {
  // `search` is already a query string built by the caller, e.g. "keyword=steel&Active=true"
  return async (dispatch) => {
    dispatch({ type: "ReviewReqStart" });
    try {
      const res = await API.get(`/review?${search}`);
      dispatch({
        type: "ReviewGet",
        payload: res.data?.data || [],
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== GET (one) =====
export const GetOneReviewAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "ReviewReqStart" });
    try {
      const res = await API.get(`/review/${id}`);
      // single endpoint returns { data: {...} }
      dispatch({
        type: "ReviewGetOne",
        payload: res.data?.data || null,
        status: res.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== CREATE =====
export const InsertReviewAction = (
  customerService,
  foodTaste,
  ratingambience,
  cleanliness,
  newDishes,
  favoriteThings,
  recommend,
  suggestions,
  atmosphere
) => {
  return async (dispatch) => {
    dispatch({ type: "ReviewReqStart" });
    try {
      await API.post(`/review`, {
        customerService,
        foodTaste,
        ratingambience,
        cleanliness,
        newDishes,
        favoriteThings,
        recommend,
        suggestions,
        atmosphere,
      });
      // your reducer expects list in payload, and delete returns 204 with no body,
      // so we standardize by refreshing the list after mutations:
      const list = await API.get(`/review`);
      dispatch({
        type: "ReviewInsert",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== UPDATE =====
export const PutReviewAction = (id, changes) => {
  // changes: any subset of { Name, Description, price, Active, ExpireDate }
  return async (dispatch) => {
    dispatch({ type: "ReviewReqStart" });
    try {
      await API.put(`/review/${id}`, changes, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const list = await API.get(`/review`);
      dispatch({
        type: "ReviewPut",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};

// ===== DELETE =====
export const DeleteReviewAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "ReviewReqStart" });
    try {
      await API.delete(`/review/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }); // backend sends 204 with no body
      const list = await API.get(`/review`);
      dispatch({
        type: "ReviewDelete",
        payload: list.data?.data || [],
        status: list.status,
      });
    } catch (error) {
      dispatch({ type: "err", err: getErr(error), status: getStatus(error) });
    }
  };
};
