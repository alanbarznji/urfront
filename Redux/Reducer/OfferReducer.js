const initialState = {
  Offer: [], // list of offers
  Session: null,
  error: null,
  errState: false,
  loading: false,
  current: null, // single offer (for GetOne)
};

const OfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OfferReqStart":
      return { ...state, loading: true, errState: false, error: null };

    case "OfferInsert":
    case "OfferPut":
    case "OfferDelete":
    case "OfferGet":
      return {
        ...state,
        loading: false,
        errState: false,
        Offer: action.payload, // should be an array (full list)
      };

    case "OfferGetOne":
      return {
        ...state,
        loading: false,
        errState: false,
        current: action.payload, // single object
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

export default OfferReducer;
