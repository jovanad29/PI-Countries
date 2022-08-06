import {
    GET_ALL_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    CREATE_ACTIVITY } from "../actions"; //GET_COUNTRY_DETAILS

const initialState = {
    allCountries: [],
    countries: [],
    activity: {},
    activities: []
  };

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_COUNTRIES:
            return {
                ...JSON.parse(JSON.stringify(state)),
                allCountries: payload
            }
        case GET_COUNTRIES_BY_NAME:
            return {
                ...JSON.parse(JSON.stringify(state)),
                countries: payload
            }
        // case GET_COUNTRY_DETAILS:
        // return {
        //     ...JSON.parse(JSON.stringify(state)),
        //     country: payload
        // }
        case CREATE_ACTIVITY:
            console.log("reducer", payload)
            return {
                ...JSON.parse(JSON.stringify(state)),
                activity:payload
            }
        // case DELETE_PRODUCT:
        // return {
        //     ...state,
        //     products: [...state.products].filter((product) => product.id !== action.payload)
        // }
        default: return state
    }
};
  
export default rootReducer;
