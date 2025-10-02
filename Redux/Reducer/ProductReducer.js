const initialState = {
  Product: [], // list of Products
  Session: null,
  error: null,
  errState: false,
  loading: false,
  current: null, // single Product (for GetOne)
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ProductReqStart":
      return { ...state, loading: true, errState: false, error: null };

    case "ProductInsert":
    case "ProductPut":
    case "ProductDelete":
    case "ProductGet":
      return {
        ...state,
        loading: false,
        errState: false,
        Product: action.payload, // should be an array (full list)
      };

    case "ProductGetOne":
      return {
        ...state,
        loading: false,
        errState: false,
        Product: action.payload, // single object
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

export default ProductReducer;
