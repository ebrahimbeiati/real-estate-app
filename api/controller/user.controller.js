import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';


export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You are just allowed to change your own account!"))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync (req.body.password, 10)
        }
        const updatedUser= await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true })
        const { password, ...others } = updatedUser._doc
        res.status(200).json(others);
    } catch (err) {
        next(err)
    }

 
}