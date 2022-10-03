import instance from '../utils'

export const postActivity = async (activity) => {
    try {
        const { data } = await instance.post('/activities', activity)
        return data
    } catch (error) {
        throw new Error(error.response.data.error.message)
    }
}