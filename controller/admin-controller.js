const User = require('../model/user-model');


const getAllUsers = async (requestAnimationFrame, res) => {
    try {
    const users = await User.find();
    } catch (error) {
        Next(error);
    }
};