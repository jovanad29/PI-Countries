import { GET_ALL_COUNTRIES, GET_COUNTRY_DETAILS } from "../actions";

const initialState = {
    countries: [],
    country: {},
    activities: []
  };

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_COUNTRIES:
            return {
                ...JSON.parse(JSON.stringify(state)),
                countries: payload
            }
        case GET_COUNTRY_DETAILS:
        return {
            ...JSON.parse(JSON.stringify(state)),
            country: payload
        }
        // case CREATE_PRODUCT:
        // return {
        //     ...state,
        //     products: [...state.products, {...action.payload}]
        // }
        // case DELETE_PRODUCT:
        // return {
        //     ...state,
        //     products: [...state.products].filter((product) => product.id !== action.payload)
        // }
        default: return state
    }
};
  
export default rootReducer;
