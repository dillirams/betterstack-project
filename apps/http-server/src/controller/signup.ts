
import { Request, Response } from 'express';
import { requestBody } from '../types/type.js';
import { prisma } from '@repo/db';
import bcrypt from 'bcrypt'

export async function signup(req: Request, res: Response) {
    const inputData = requestBody.safeParse(req.body);
    console.log(inputData)
    if (!inputData.success) {
        res.status(404).json({
            message: "invalid input format"
        })
        return
    }
    try {
        const hashedPassword = await bcrypt.hash(inputData.data.password, 5)
        const user = await prisma.user.create({
            data: {
                name: inputData.data.name,
                password: hashedPassword
            }
        })

    
        if (user) {
            res.status(201).json({
                message: "user created successfully",
                user:user
            })
        }


    } catch (e) {
        res.status(404).json({
            message: "something went wrong",
        })
        console.log(e)
        return
    }
}