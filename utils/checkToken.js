import jwt  from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.body.token
    console.log(req.body.token);
    if (!token)
        return next(createError(401,"You are not authenticated"))

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(401,"Token is not valid"))
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            next(createError(403, "Your user is not authorised"))
    }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.admin) {
            next()
        } else {
            next(createError(403, "Your user is not an admin"))
        }
    })
}