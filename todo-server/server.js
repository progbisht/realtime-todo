const express = require('express')
const app = express()

const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const fsPromises = require('fs').promises

const data = {
    list: require('./Model/List.json'),
    setList: function(data){ this.list = data }
}

const { createServer } = require("http");
const { Server } = require("socket.io");


const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions
})


io.on("connection", (socket) => {
    console.log(`Connected ${socket.id}`)

    // @desc - add a new task
    // @access - public
    socket.on("addTask", async (addTask) => {
		
        if(!addTask.task){
            return res.status(400).json({
                message : "Incomplete task details."
            })
        }

        data.setList([ ...data.list, { 
            id : data.list.length ? data.list[data.list.length - 1].id + 1 : 1,
            ...addTask
        } ])
        data.list.sort( (t1, t2) => t1.id - t2.id )

        // saving the data in file after making changes
        await fsPromises.writeFile(path.join(__dirname, 'Model' , 'List.json'), JSON.stringify(data.list))
    
        // updating the connected clients
		io.emit("updatedList", data.list);
	})


	// @desc - update any task
    // @access - public
	socket.on("updateTask", async(updateTask) => {
        
        const id = updateTask.id

		const existingTask = data.list.find((task) => task.id === id) 
        
        if(!existingTask){
            // updating the connected clients
            const message = "No such task exists."
            io.emit("errorMsg", message)
        }

        const filteredList = data.list.filter((task) => task.id !== id)

        data.setList([ ...filteredList, updateTask])
        
        data.list.sort( (t1,t2) => t1.id - t2.id )
        
        // saving the data in file after making changes
        await fsPromises.writeFile(path.join(__dirname, 'Model' , 'List.json'), JSON.stringify(data.list))
    
        // updating the connected clients
        io.emit("updatedList", data.list);

	})


    // @desc - delete any task whether completed or not
    // @access - public
	socket.on("deleteTask", async (id) => {
		        
        const existingTask = data.list.find((task) => task.id === parseInt(id)) 

        if(!existingTask){
            // updating the connected clients
            const message = "No such task exists."
            io.emit("errorMsg", message)
        }

        const filteredList = data.list.filter((task) => task.id !== parseInt(id))

        data.setList([ ...filteredList ])

        data.list.sort( (t1,t2) => t1.id - t2.id )
        
        // saving the data in file after making changes
        await fsPromises.writeFile(path.join(__dirname, 'Model' , 'List.json'), JSON.stringify(data.list))
    
        // updating the connected clients
        io.emit("updatedList", data.list);
	})


    // @desc - delete completed tasks
    // @access - public
    socket.on("deleteCompletedTasks", async (ids) => {
	    const completed = ids.split(',')
        
        completed.forEach( id => {
            
            const existingTask = data.list.find((task) => task.id === parseInt(id)) 
                
            if(!existingTask){
                // updating the connected clients
                const message = "No such task exists."
                io.emit("errorMsg", message)
            }
    
            const filteredList = data.list.filter((task) => task.id !== parseInt(id))
    
            data.setList([ ...filteredList ])
            
            
        });

        data.list.sort( (t1,t2) => t1.id - t2.id )
        
        // saving the data in file after making changes
        await fsPromises.writeFile(path.join(__dirname, 'Model' , 'List.json'), JSON.stringify(data.list))

        // updating the connected clients
        io.emit("updatedList", data.list);

		
	})

	socket.on("disconnect", () => {
		console.log(`Disconnected ${socket.id}`);
	});
})

const PORT = process.env.PORT || 4000

app.use(cors(corsOptions))

app.use(express.json())

app.use('/api/v1/todo', require('./router/api/todoRoute'))

app.all('*', (req,res) => {
    res.status(404)

    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404Page.html'));
    }
    else if(req.accepts('json')){
        res.json({ message : "404, Resource not found" })
    }
    else{
        res.type('txt').send("404, Resource not found")
    }
})


server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})