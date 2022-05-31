import MyUser from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new MyUser({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(200).send("User has been created")
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await MyUser.findOne({username:req.body.username})
        if (!user) return next(createError(404, "User not found!"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong username or password!"))

        const token = jwt.sign({id:user.id,admin:user.isAdmin}, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = user._doc
        res.cookie("access_token", token, {
            // httpOnly: true, //to prevent secret tools from the client to reach that cookie,
            maxAge: 20000
        })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin, message: "Logged in successfully", token })
    } catch (err) {
        next(err)
    }
}