const initialState = {
  OrderItems: [], // list of OrderItemss
  Session: null,
  error: null,
  errState: false,
  loading: false,
  current: null, // single OrderItems (for GetOne)
};

const OrderItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OrderItemsReqStart":
      return { ...state, loading: true, errState: false, error: null };

    case "OrderItemsInsert":
    case "OrderItemsPut":
    case "OrderItemsDelete":
    case "OrderItemsGet":
      return {
        ...state,
        loading: false,
        errState: false,
        OrderItems: action.payload, // should be an array (full list)
      };

    case "OrderItemsGetOne":
      return {
        ...state,
        loading: false,
        errState: false,
        OrderItems: action.payload, // single object
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

export default OrderItemsReducer;
