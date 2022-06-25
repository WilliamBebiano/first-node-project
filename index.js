const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())



const users = [] /// criado um array para armazenar os dados 

const checkUserId = (request,response, next) =>{
    const {id} = request.params

    const index = users.findIndex( user => user.id === id)

    if (index < 0){
    return response.status(404).json({error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

// Rota Get retornando a quantidade de usuarios dentro do Array
app.get('/users', (request,response) => {
    
    
        return response.json(users)
})

// Rota Post Crindo informacao dos usuarios dentro do array (ainda nao colocamos num banco )
app.post('/users', (request,response) => {
    const { name, age } = request.body
 
    const user =  {id : uuid.v4(), name, age }

    users.push(user)

        return response.status(201).json(user)
})

// Rota Put Atualizar os usuarios 
app.put('/users/:id', checkUserId, (request,response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updateUser = { id, name, age}

       
    users[index] = updateUser
    
    
    
    return response.json(updateUser)
})
//  Rota delete , apagar usuario
app.delete('/users/:id', checkUserId, (request,response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json(users)
})



app.listen(port, () =>{
    console.log(`🚀Server started on port ${port}`)
})