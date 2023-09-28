const User = require('./user.model');
const { createUser, listUsers, showUser, updateUser, deleteUser, } = require('./user.service')

const createUserController = async (req,res) => {
    try {
        const newUser ={
            email: req.body.email,
            userName: req.body.userName,
            _id: req.body.id,
        }
        const user = await createUser(newUser)
        res.status(201).json({message: 'User created', data: user})
    } catch (error) {
        res.status(400).json({ message: 'User could not created', data: error.message })
    }
}
const listUsersController = async (req, res) => {
    try {
       const users = await listUsers()
       res.status(200).json({message: 'users listed', data: users }) 
    } catch (error) {
        res.status(400).json({ message: 'Users could not listed', data: error.message})
    }
}
const showUserController = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).populate({
            path: 'messages',
            select: '-_id messageText emailMessage user createdAt updatedAt', // Excluye el campo "_id"
          });
        res.status(200).json({message: 'showed user', data: user }) 
     } catch (error) {
         res.status(400).json({ message: 'show user could not listed', data: error.message})
     }
}
const updateUserController = async (req, res) => {
    try {
        const { id } = req.params
        const { email, userName } = req.body
        const newUser = await updateUser(id, { email, userName } )
        res.status(200).json({message: 'User update', data: newUser }) 
     } catch (error) {
         res.status(400).json({ message: 'User could not updated', data: error.message})
     }
}
const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params
        const user = await deleteUser(id)
        res.status(200).json({message: 'User deleted', data: user })
    } catch (error) {
        res.status(400).json({ message: 'User could not deleted', data: error.message})
    }
}

module.exports= {
    createUserController,
    listUsersController,
    showUserController,
    updateUserController,
    deleteUserController,
}