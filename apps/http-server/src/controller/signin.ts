import { Request, Response } from "express";
import { requestBody } from "../types/type.js";
import { prisma } from "@repo/db";
import bcrypt from 'bcrypt'
import "dotenv/config";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
const JWT_SECRET = process.env.JWT_SECRET

export async function signin(req: Request, res: Response) {
    const inputData = requestBody.safeParse(req.body);
    if (!inputData.success) {
        res.status(404).json({
            message: "invalid input format"
        })
        return
    }

    const user = await prisma.user.findFirst({
        where: {
            name: inputData.data?.name
        }
    })
    if (!user) {
        res.status(404).json({
            message: "user not present"
        })
        return
    }
    const verifiedPassword = await bcrypt.compare(inputData.data?.password as string, user.password);
    if (!verifiedPassword) {
        res.status(404).json({
            message: "incorrect password"
        })
        return
    }
    try {

        const token = jwt.sign({
            id: user.id
        }, JWT_SECRET as string)

        // res.cookie("token",token,{
        //     httpOnly:true,
        //     sameSite:"lax",
        //     secure:true
        // })

        res.status(200).json({
            message: "user loggedin successfully",
            jwt: token
        })

    } catch (e) {
        res.status(404).json({
            message: "something went wrong"
        })
        return
    }
}