
const fetch = require('../../utils')

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const GET_COUNTRIES_BY_NAME = 'GET_COUNTRIES_BY_NAME'
export const FILTER_BY_CRITERIA = 'FILTER_BY_CRITERIA'
export const ORDER_BY_CRITERIA = 'ORDER_BY_CRITERIA'
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'
export const DELETE_ACTIVITY_FROM_COUNTRY = 'DELETE_ACTIVITY_FROM_COUNTRY'
export const DELETE_COUNTRY_FROM_ACTIVITY = 'DELETE_COUNTRY_FROM_ACTIVITY'


export const getCountries = () => {
    return async (dispatch) => {
        try {
            const { data } = await fetch.get('/countries')
            return dispatch({ type: GET_ALL_COUNTRIES, payload: data })
        } catch (error) {
            console.log(error)
            return dispatch({ type: GET_ALL_COUNTRIES, payload: [], error })
        }
    }
}

export const getCountriesByName = (searched) => {
    return async (dispatch) => {
        try {
            const { data } = await fetch.get('/countries?name=' + searched)
            return dispatch({ type: GET_COUNTRIES_BY_NAME, payload: data })
        } catch (error) {
            return dispatch({ type: GET_COUNTRIES_BY_NAME, payload: [], error })
        }
    }
}

export const filterByCriteria = (values) => {
    return { type: FILTER_BY_CRITERIA, values }
}

export const orderByCriteria = (value) => {
    return { type: ORDER_BY_CRITERIA, value }
}

// export function createActivity(payload) {
//     return async (dispatch) => {
//         try {
//             var { data } = await fetch.post('/activities', payload)
//             return dispatch({ type: CREATE_ACTIVITY, payload: data })
//         } catch (error) {
//             return dispatch({ type: CREATE_ACTIVITY, payload: error.data.values, error })
//         };
//     };
// };

export const getActivities = () => {
    return async (dispatch) => {
        try {
            const { data } = await fetch.get('/activities')
            return dispatch({ type: GET_ALL_ACTIVITIES, payload: data })
        } catch (error) {
            return dispatch({ type: GET_ALL_ACTIVITIES, payload: [], error })
        }
    }
}

export const deleteActivityFromCountry = (a_id, c_id) => {
    return async (dispatch) => {
        try {
            const { data } = await fetch.delete(`/countries/${c_id}/activities/${a_id}`)
            return dispatch({ type: DELETE_ACTIVITY_FROM_COUNTRY, payload: data })
        } catch (error) {
            return dispatch({ type: DELETE_ACTIVITY_FROM_COUNTRY, payload: [], error })
        }
    }
}
