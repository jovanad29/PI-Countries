import {
    GET_ALL_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    CREATE_ACTIVITY, 
    FILTER_BY_CRITERIA,
    GET_ALL_ACTIVITIES} from "../actions";

const initialState = {
    allCountries: [],
    countries: [],
    activities: [],
    activity: {},
    error: {}
  };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...JSON.parse(JSON.stringify(state)),
                allCountries: action.payload,
                countries: action.payload,
                // filteredCountries: []
            }
        case GET_COUNTRIES_BY_NAME:
            return {
                ...JSON.parse(JSON.stringify(state)),
                countries: action.payload,
                error: action.error ? {
                    status: action.error.response.status,
                    message: action.error.response.data.error.message
                } : {},
                // filteredCountries: []
            }
        case FILTER_BY_CRITERIA:
            let filtered = []
            let isFiltering = false
            if (action.values.continent && action.values.continent !== '0'){
                isFiltering = true
                filtered = filtered.length ? filtered : [...state.allCountries]
                filtered = [...state.allCountries].filter(c => {
                    return c.continent === action.values.continent
                })
            }
            if (action.values.activity && action.values.activity !== '0'){
                isFiltering = true
                filtered = filtered.length ? filtered : [...state.allCountries]
                filtered = filtered.filter(c => {
                    return c.activities.some(a => a.activity_id === action.values.activity)
                })
            }
            return {
                ...JSON.parse(JSON.stringify(state)),
                // filteredCountries: filtered,
                countries: isFiltering ? filtered : state.allCountries,
                error: isFiltering && !filtered.length ? {
                    message: "No countries found under selected criteria"
                } : {}
            }
        case CREATE_ACTIVITY:
            return {
                ...JSON.parse(JSON.stringify(state)),
                activity: action.payload
            }
        case GET_ALL_ACTIVITIES:
            return {
                ...JSON.parse(JSON.stringify(state)),
                activities: action.payload,
                error: action.error ? {
                    status: action.error.response.status,
                    message: action.error.response.data.error.message
                } : {},
                // filteredCountries: []
            }
        default: return state
    }
};
  
export default rootReducer;
