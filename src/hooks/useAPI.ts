import axios from 'axios'

const useAPI = () => {
  const jwtToken = localStorage.getItem('JWT')

  const BASE_URL = 'http://localhost:4000'

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  })

  const apiPost = async (url: string, payload: Object) => {
    try {
      const { data } = await axiosInstance.post(BASE_URL + url, payload)
      return data
    } catch (error: any) {
      throw error.message
    }
  }

  const apiGet = async (url: string, params?: any) => {
    try {
      const { data } = await axiosInstance.get(BASE_URL + url + params)
      return data
    } catch (error: any) {
      throw error.message
    }
  }

  return {
    apiPost,
    apiGet
  }
}

export default useAPI
