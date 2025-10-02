const initialState = {
  Category: [], // list of Categorys
  Session: null,
  error: null,
  errState: false,
  loading: false,
  current: null // single Category (for GetOne)
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CategoryReqStart":
      return { ...state, loading: true, errState: false, error: null };
      
      case "CategoryInsert":
        case "CategoryPut":
          case "CategoryDelete":
            case "CategoryGet":
              return {
                ...state,
                loading: false,
                errState: false,
                Category: action.payload, // should be an array (full list)
              };
              
              case "CategoryGetOne":
 
     
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

export default CategoryReducer;
