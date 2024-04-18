import { useState, useEffect } from "react"
import axios from "axios"

// custom hook to fetch data 
const useAxiosFetch = (dataUrl) => {

    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isloading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true

        // cancels the request if component is unmounted
        const source = axios.CancelToken.source()

        const fetchData = async(url) => {
            setIsLoading(true)
            try{
                const response = await axios.get(url, {
                    cancelToken: source.token
                })
                if(isMounted){
                    setData(response.data)
                    setFetchError(null)
                }
            }
            catch(err){
                if(isMounted){
                    setFetchError(err.message)
                    setData([])
                }
            }
            finally{
                isMounted && setIsLoading(false)
            }

        }

        fetchData(dataUrl)

        // cleanup
        const cleanUp = () => {
            isMounted = false
            source.cancel()
        }

        return cleanUp
    }, [dataUrl])

    return { data, fetchError, isloading }
}

export default useAxiosFetch