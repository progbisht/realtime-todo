import { useEffect, useState } from "react"
import useData from "./hooks/useData"


const Footer = () => {

    const { list, handleCompleted } = useData()

    const [completedTasks, setCompletedTasks] = useState(0)
    const [remainingTasks, setRemainingTasks] = useState(0)

    useEffect( ()=> {
      const compTasks = list.filter( (task) => task.checked === true )
      setCompletedTasks(compTasks.length)
      setRemainingTasks(list.length - completedTasks)

    },[list, completedTasks])

    

    return (
        <footer>
            <span>{remainingTasks} { remainingTasks === 1 ? "task" : "tasks"} left</span>
            <span> <span className="clear" onClick={handleCompleted}>Clear</span> {completedTasks} completed { completedTasks === 1 ? "task" : "tasks"}</span>
        </footer>
    )
}

export default Footer