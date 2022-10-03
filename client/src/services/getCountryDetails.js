import instance from '../utils'
export const getCountryDetails = async (id) => {
    try {
        const { data } = await instance.get("/countries/" + id)
        return data
    } catch (error) {
        throw new Error(error.response.data.error.message)
    }
}