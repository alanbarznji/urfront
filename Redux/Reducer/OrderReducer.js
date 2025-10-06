const initialState = {
  Order: [], // list of Orders
  Session: null,
  error: null,
  errState: false,
  loading: false,
  current: null, // single Order (for GetOne)
  status: null,
};

const OrderReducer = (state = initialState, action) => {
  console.log("OrderReducer action:", action);
  switch (action.type) {
    case "OrderReqStart":
      return { ...state, loading: true, errState: false, error: null };

    case "OrderInsert":
      {
  console.log("Reducer reached");
        return {
          ...state,
          loading: false,
          errState: false,
          status: 200,
        };
      }
    case "OrderPut":
    case "OrderDelete":
    case "OrderGet":
      return {
        ...state,
        loading: false,
        errState: false,
        Order: action.payload, // should be an array (full list)
      };

    case "OrderGetOne":
      return {
        ...state,
        loading: false,
        errState: false,
        Order: action.payload, // single object
      };

    case "err":
      return {
        ...state,
        loading: false,
        errState: true,
        error: action.err,
      };

    default:
      return state;
  }
};

export default OrderReducer;
