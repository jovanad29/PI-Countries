
import axios from 'axios'

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS"
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES"
export const POST_ACTIVITY = "POST_ACTIVITY"


export const getCountries = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get("http://localhost:3001/countries")
            return dispatch({ type: GET_ALL_COUNTRIES, payload: data })            
        } catch (error) {
            console.log(error)
        }
    }
}

// export const getCountryDetail = (id) => {
//     return async (dispatch) => {
//         try {
//             const { data } = await axios.get("http://localhost:3001/countries/"+id)
//             return dispatch({ type: GET_COUNTRY_DETAILS, payload: data })            
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

// export function getMoviesFavorite(payload) {
//     return { type: "ADD_MOVIE_FAVORITE", payload };
// }

// export function removeMovieFavorite(payload) {
//     return { type: "REMOVE_MOVIE_FAVORITE", payload };
// }
   
// export function getMovies(titulo) {
//     return function(dispatch) {
//       return fetch("http://www.omdbapi.com/?apikey=20dac387&s=" + titulo)
//         .then(response => response.json())
//         .then(json => {
//           dispatch({ type: "GET_MOVIES", payload: json });
//         });
//     };
// }
  
// export function getDetails(id) {
//     return function(dispatch) {
//       return fetch("http://www.omdbapi.com/?apikey=20dac387&i=" + id)
//         .then(response => response.json())
//         .then(json => {
//           dispatch({ type: "GET_DETAILS", payload: json });
//         });
//     };
// }

