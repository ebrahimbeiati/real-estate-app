import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';



export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, "You are not allowed to update this account"))
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      }
      
    }, { new: true })
    const { password, ...others} = updatedUser._doc
    res.status(200).json(others)
  } catch (err) {
    next(err)
  }
}