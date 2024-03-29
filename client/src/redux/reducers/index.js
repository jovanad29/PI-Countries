import {
    GET_ALL_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    // CREATE_ACTIVITY,
    FILTER_BY_CRITERIA,
    GET_ALL_ACTIVITIES,
    ORDER_BY_CRITERIA,
    DELETE_ACTIVITY_FROM_COUNTRY} from "../actions";

const initialState = {
    allCountries: [],
    countries: [],
    activities: [],
    // activity: {},
    error: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                countries: action.payload,
                error: action.error ? {
                    message: action.error.message
                } : {}
            }
        case GET_COUNTRIES_BY_NAME:
            return {
                ...state,
                allCountries: action.payload,
                countries: action.payload,
                error: action.error ? {
                    status: action.error.response.status,
                    message: action.error.response.data.error.message
                } : {},
            }
        case FILTER_BY_CRITERIA:
            let filtered = []
            let isFiltering = false
            if (action.values.continent && action.values.continent !== '0'){ // si es diferente a activity
                isFiltering = true
                filtered = filtered.length ? filtered : [...state.allCountries]
                filtered = filtered.filter(c => {
                    return c.continent === action.values.continent
                })
            }
            if (action.values.activity && action.values.activity !== '0'){ // else
                isFiltering = true
                filtered = filtered.length ? filtered : [...state.allCountries]
                filtered = filtered.filter(c => {
                    return c.activities.some(a => a.activity_id === action.values.activity)
                })
            }
            return {
                ...JSON.parse(JSON.stringify(state)),
                countries: isFiltering ? filtered : state.allCountries,
                error: isFiltering && !filtered.length ? {
                    message: "No countries found under selected criteria"
                } : {}
            }
        case ORDER_BY_CRITERIA:
            if (action.value.order === 'a-z'){
                return {
                    ...state,
                    countries: [...state.countries].sort((a,b) => a.name.localeCompare(b.name))
                }
            } else if (action.value.order === 'z-a'){
                return {
                    ...state,
                    countries: [...state.countries].sort((a,b) => b.name.localeCompare(a.name))
                }
            } else if (action.value.order === 'min-max'){
                return {
                    ...state,
                    countries: [...state.countries].sort((a,b) => a.population - b.population)
                }
            } else if (action.value.order === 'max-min'){
                return {
                    ...state,
                    countries: [...state.countries].sort((a,b) => b.population - a.population)
                }
            }
            return {
                ...state,
                countries: [...state.countries]
            }
        // case CREATE_ACTIVITY:
        //     return {
        //         ...JSON.parse(JSON.stringify(state)),
        //         activity: action.payload
        //     }
        case GET_ALL_ACTIVITIES:
            return {
                ...JSON.parse(JSON.stringify(state)),
                activities: action.payload,
                error: action.error ? {
                    status: action.error.response.status,
                    message: action.error.response.data.error.message
                } : {},
            }
        case DELETE_ACTIVITY_FROM_COUNTRY:
            return {...JSON.parse(JSON.stringify(state))}
        default: return state
    }
};
  
export default rootReducer;
