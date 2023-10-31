import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import  Jwt  from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User ({
        username,
        email,
        password: hashedPassword
    })
    try{
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "User created successfully",
        })
    }catch(err){
        next(err);
        }
    }
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        const isPasswordCorrect = bcryptjs.compareSync(
          password,
          validUser.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Wrong password",
            })
        }
        const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...others } = validUser._doc;
        res.cookie('jwToken', token, { httpOnly: true }).status(200).json(others);
            
            } catch (err) {
            next(err);
            }
        };
