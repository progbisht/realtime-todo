import useData from "./hooks/useData"


const AddTask = () => {
    const { newTask, setNewTask, handleAddTask } = useData()

    
    return (
        <form className="addForm" onSubmit={handleAddTask}>
            <label htmlFor='addItem'></label>
            <input
                type='text'
                id='addItem'
                placeholder='buy milk'
                required

                value={newTask}
                onChange={(e)=>setNewTask(e.target.value)}
            />

        </form>
    )
}

export default AddTask