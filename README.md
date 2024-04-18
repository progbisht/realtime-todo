# Todo App
This is a todo app assignment developed using Node.js Express.js and React.js.


## Description
This application can perform the following tasks
- Add a task to their to-do list
- Mark a task as done using a checkbox
- Delete a task, whether it’s done or not, using a ‘delete’ icon on the right side of the task.
- See a count of undone tasks.
- Delete all ‘done’ tasks.

This app support adding, updating and deleting the same list from multiple tabs or windows.


## Requirements 
- React.js: Frontend library for building user interfaces.
- Node.js: JavaScript runtime environment for server-side code.
- Express.js: Backend framework for building RESTful APIs.
- Socket.io: Library for building realtime applications.


## Versions
- Node.js       (v20.9.0)
- npm           (10.1.0)


## Installation

1. Download the zip file and open the todlist folder:

2. Change into the client directory:
   ```
   cd todo-server


3. Install server dependencies:
   ```
   npm install

4. Change into the client directory:
   ```
   cd client

5. Install client dependencies:
   ```
   npm install



## Usage
1. Open the client directory and start the development server:
    ```
    npm start
    ```
    This will start the frontend server (React.js).
    Access the application in a web browser: http://localhost:3000/


2. Change into the server directory and run the server:
    ```
    cd ..
    cd todo-server
    npm run dev
    ```
    This will start the backend server (Node.js/Express.js) at http://localhost:4000/



## Folder Structure
 
todolist/
│
├── todo-client/             # Frontend React.js application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── index.js
│
├── todo-server/             # Backend Node.js/Express.js application
│   ├── config/
│   ├── controllers/
│   ├── Models/
│   ├── routes/
│   └── server.js
│
└── README.md

