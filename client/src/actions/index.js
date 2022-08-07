
import axios from 'axios'

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const GET_COUNTRIES_BY_NAME = 'GET_COUNTRIES_BY_NAME'
export const FILTER_BY_CRITERIA = 'FILTER_BY_CRITERIA'
// export const GET_COUNTRY_DETAILS = 'GET_COUNTRY_DETAILS'
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'


export const getCountries = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/countries')
            return dispatch({ type: GET_ALL_COUNTRIES, payload: data })            
        } catch (error) {
            return dispatch({ type: GET_ALL_COUNTRIES, payload: [], error })
        }
    }
}

export const getCountriesByName = (searched) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/countries?name='+searched)
            return dispatch({ type: GET_COUNTRIES_BY_NAME, payload: data })            
        } catch (error) {
            return dispatch({ type: GET_COUNTRIES_BY_NAME, payload: [], error })
        }
    }
}

export const filterByCriteria = (values) => {
    return (dispatch) => {
        return dispatch({type: FILTER_BY_CRITERIA, values})
    }
}

export function createActivity(payload) {
    return async (dispatch) => {
        try {
            var { data } = await axios.post('http://localhost:3001/activities', payload)
            return dispatch({ type: CREATE_ACTIVITY, payload: data })
        } catch (error) {
            return dispatch({ type: GET_COUNTRIES_BY_NAME, payload: error.data.values, error })
        };
    };
};

export const getActivities = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/activities')
            return dispatch({ type: GET_ALL_ACTIVITIES, payload: data })            
        } catch (error) {
            return dispatch({ type: GET_ALL_ACTIVITIES, payload: [], error })
        }
    }
}
