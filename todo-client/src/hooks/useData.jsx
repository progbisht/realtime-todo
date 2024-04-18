import { useContext } from "react"
import DataContext from "../context/DataProvider"

// custom hook to provide data 
const useData = () => {
    return useContext(DataContext)
}

export default useData