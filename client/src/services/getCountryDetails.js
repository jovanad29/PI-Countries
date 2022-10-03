import instance from '../utils'
export const getCountryDetails = async (id) => {
    try {
        const { data } = await instance.get("/countries/" + id)
        return data
    } catch (error) {
        console.log(error)
    }
}