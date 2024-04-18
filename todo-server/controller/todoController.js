const data = {
    list: require('../Model/List.json'),
    setList: function(data){ this.list = data }
}

const fsPromises = require('fs').promises
const { query } = require('express')
const path = require('path')



// @desc - GetAllTasks
// @route = GET /api/vi/todo
// @access - public
const handleGetAllTasks = (req,res) => {
    try{
        res.status(200).json(data.list)
    }
    catch(err){
        return res.status(500).json({ message: "Some error occured." })
    }
}


// @desc - Get Requested Pages
// @route = GET /api/vi/todo/pages
// @access - public
const handleSendPages = (req, res) => {
    try{

        const { page, size } = req.query
        
        let pageNo = parseInt(page)
        let pageSize = parseInt(size)

        // default page number
        if(pageNo < 1){
            pageNo = 1
        }

        // default page size
        if(pageSize < 1){
            pageSize = 3
        }
        

                
        // skip the number of pages and calculating the starting and end index
        let startIndex = (pageNo - 1) * pageSize
        let lastIndex = pageNo * pageSize
       

        const paginatedTask = data.list.slice(startIndex, lastIndex)

        // Since we may left out with the pages when divided by the pagesize (remainder pages -> Math.Ceil)
        const totalPages = Math.ceil(data.list.length/pageSize)

        
        res.status(200).json({
                paginatedTask,
                totalPages
            }
        )
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Some error occured." })
    }
    
}



module.exports = {
    handleGetAllTasks,
    handleSendPages
}




/*
// @desc - Add Task
// @route = POST /api/vi/todo
// @access - public
const handleAddTask = async (req, res) => {
    try{
        
        const { checked, task } = req.body

        const newTask = {
            id : data.list.length ? data.list[data.list.length - 1].id + 1 : 1,
            checked : checked,
            task: task
        }
        
        if(!newTask.task){
            return res.status(400).json({
                message : "Incomplete task details."
            })
        }

        data.setList([ ...data.list, newTask ])
        data.list.sort( (t1, t2) => t1.id - t2.id )

        await fsPromises.writeFile(path.join(__dirname, '..' , 'Model' , 'List.json'), JSON.stringify(data.list))

        res.status(201).json(data.list)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Some error occured." })
    }
}


// @desc - Update Task
// @route = PATCH /api/vi/todo
// @access - public
const handleUpdateTask = async (req,res) => {
    try{

        const id = parseInt(req.params.id)
        
        const { checked, task } = req.body
        
        const existingTask = data.list.find((task) => task.id === id) 
        
        if(!existingTask){
            return res.status(400).json({
                message: "No such task exists."
            })
        }

        if(checked !== undefined){
            existingTask.checked = checked
        }
        if(task !== undefined){
            existingTask.task = task
        }

        const filteredList = data.list.filter((task) => task.id !== id)

        data.setList([ ...filteredList, existingTask])
        
        data.list.sort( (t1,t2) => t1.id - t2.id )
        console.log(data.list);

        await fsPromises.writeFile(path.join(__dirname, '..' , 'Model' , 'List.json'), JSON.stringify(data.list))

        res.status(200).json(data.list)
    }
    catch(err){
        return res.status(500).json({ message: "Some error occured." })
    }
}

// @desc - Delete Task
// @route = DELETE /api/vi/todo
// @access - public
const handleDeleteTask = async (req,res) => {
    try{
        console.log((req.params.id).split(','));
        const ids = (req.params.id).split(',')
        
        ids.forEach( id => {
            console.log(id);
            const existingTask = data.list.find((task) => task.id === parseInt(id)) 
            console.log(existingTask);
    
            if(!existingTask){
                return res.status(400).json({
                    message: "No such task exists."
                })
            }
    
            const filteredList = data.list.filter((task) => task.id !== parseInt(id))
    
            data.setList([ ...filteredList ])
            
            
        });

        data.list.sort( (t1,t2) => t1.id - t2.id )
        
        await fsPromises.writeFile(path.join(__dirname, '..' , 'Model' , 'List.json'), JSON.stringify(data.list))
        res.status(200).json(data.list)

    }
    catch(err){
        return res.status(500).json({ message: "Some error occured." })
    }
}

module.exports = {
    handleGetAllTasks,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask
}
*/

