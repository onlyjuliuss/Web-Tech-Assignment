const express = require("express")
const app = express()
const fs = require("fs")
let users;
const PORT = 5000
fs.readFile("users.json","utf-8",(error,data)=>{
    if(error){
        console.log("Unable to read from file")
    }
    users = JSON.parse(data)
})

app.get("/",(req,res)=>{
    res.send("Hello and Welcome To my Server")
})

app.get("/users",(req,res)=>{
    if(!users){
        console.log("User list is empty")
        res.status(404).send("User list is empty")
    }
    res.status(200).send(users)
})

app.get("/users/:id",(req,res)=>{ 
    const users_array = Object.values(users)
    const user_found = users_array.find(user => user.id === parseInt(req.params.id))
    if(!user_found){
        console.log("User not found")
        return res.status(404).send("User not found")
    }
    res.status(200).send(user_found)
})

app.get("/users/profession/:profession",(req,res)=>{ 
    const users_array = Object.values(users)
    const user_found = users_array.find(user => user.profession === req.params.profession)
    if(!user_found){
        console.log("User not found")
        return res.status(404).send("User not found")
    }
    res.status(200).send(user_found)
})

app.get("/users/name/:name",(req,res)=>{ 
    const users_array = Object.values(users)
    const user_found = users_array.find(user => user.name === req.params.name)
    if(!user_found){
        console.log("User not found")
        return res.status(404).send("User not found")
    }
    res.status(200).send(user_found)
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})