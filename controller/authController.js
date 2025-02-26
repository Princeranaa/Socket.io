const User = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req,res) => {
    try {
        const {name,password,email} = req.body;
        const existingUSer = await User.findOne({email});
        if(existingUSer){
            return res.status(400).json({message:'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = User.create({name,password:hashedPassword, email})

        res.status(200).json({
            message: 'User created successfully',
            user: user
        });
    } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});        
    }

    


}