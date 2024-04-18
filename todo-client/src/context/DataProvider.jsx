import { createContext, useEffect, useState } from 'react'
import useSocket from '../hooks/useSocket'
// import useAxiosFetch from '../hooks/useAxiosFetch'
import axios from '../api/axios'

const DataContext = createContext({})


export const DataProvider = ({ children }) => {
    const socket = useSocket()

    const [list, setList] = useState([])
    const [newTask, setNewTask] = useState("")

    const [fetchErr, setFetchErr] = useState(null)
    // const [loading, setLoading] = useState(false)

    const [errMessge, setErrMessage] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    // fetch data using custom hook
    // const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:4000/api/v1/todo')

    // useEffect(() => {
        
    //     setList(data)
    //     setFetchErr(fetchError)
    //     setLoading(isLoading)

    // }, [data, fetchError, isLoading])


    // // fetch data using axios
    const handleFetchPages = async (page) => {
        let isMounted = true

        try{
            const response = await axios.get(`/api/v1/todo?page=${page}&size=3`)
            if(isMounted){
                
                setList(response.data.paginatedTask)
                setTotalPages(response.data.totalPages)
                setFetchErr(null)
            }

        }
        catch(err){
            if(isMounted){
                setFetchErr(err.message)
            }
        }
        finally{
            isMounted = false
        }
    }

    useEffect(() => {
        handleFetchPages(currentPage)
    }, [currentPage, list])


    //@desc - navigate to previous task page
    const handlePrevious = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }
    
    //@desc - navigate to next task page
    const handleNext = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1)
        }
    }

    //@desc - add new task in the list
    const handleAddTask = async (e) => {
        e.preventDefault()
               
        const addTask = { checked: false, task: newTask }
        
        try{
            socket.emit('addTask', addTask)
            setNewTask("")
        }
        catch(err){
            console.error(err)
        }
        
    }

    //@desc - update the task list
    const handleEdit = async( id ) => {
        
        const taskList = list.filter((task) => task.id === id)
        
        const updateTask = { ...taskList[0], checked: !taskList[0].checked }
        
        try{
            socket.emit('updateTask', updateTask)
        }
        catch(err){
            console.error(err)
        }

    }


    //@desc - delete any task from the list
    const handleDelete = async (id) => {

        try{
            socket.emit("deleteTask", id);
        }
        catch(err){
            console.error(err)
        }
        
    }

    //@desc - delete completed tasks from the list
    const handleCompleted = async() => {
        const completed = list.filter((task) => task.checked === true)
        
        const idsArray = completed.map((task) => task.id)
        const ids = idsArray.toString()      

        try{
            socket.emit("deleteCompletedTasks", ids);
        }
        catch(err){
            console.error(err)
        }

    }

    useEffect(() => {
       
        socket.on("connect", () => {
            console.log("connected");
        })

        socket.on("updatedList", (data) => {
            setList(data)
        })

        socket.on("connect_err", (err) => {
            setErrMessage(err)
        })
        
        //  cleanup 
        // return () => {
        //     socket.emit("end")
        // }
    }, [socket])

    
    return(
        <DataContext.Provider
            value={{ 
                list, setList, 
                fetchErr, 
                // loading,
                handlePrevious, handleNext,
                currentPage, totalPages,
                newTask, setNewTask, 
                errMessge,
                handleAddTask,
                handleEdit, handleDelete,
                handleCompleted               
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataContext