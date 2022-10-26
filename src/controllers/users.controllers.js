const UsersServices = require('../services/users.services');

const getAllUsers = async (req, res) => {
    try {
        const users = await UsersServices.getAll();
        res.send(users);
    } catch (error) {
        console.log(error);
    }
}

const createUser = async(req, res)=>{
    try {
        const newUser = req.body;
        const user = await UsersServices.create(newUser);
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res)=>{
    try {
        const updatedUser = req.body;
        const { id } = req.params;
        const result = await UsersServices.update(updatedUser, id);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
} 

const deleteUser = async (req, res)=>{
    try {
        const { id } = req.params;
        const result = await UsersServices.delete(id);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}