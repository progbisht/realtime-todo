import { FiDelete } from "react-icons/fi";
import useData from "./hooks/useData";


const ListTask = ({ task }) => {

    const { handleEdit, handleDelete } = useData([])

    return (
        <li>
            <span className="bundle">
                <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={()=>{handleEdit(task.id)}}  
                />
                <label className={task.checked ? "completed" : "unCompleted"}>
                    {task.task}
                </label>
            </span>
            <FiDelete onClick={()=>{handleDelete(task.id)}}/>

        </li>
    )
}

export default ListTask