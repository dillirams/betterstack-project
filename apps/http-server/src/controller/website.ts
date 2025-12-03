import { prisma } from "@repo/db";
import { Request, Response } from "express";


export async function website(req:Request,res:Response) {
    const userId=req.id;
    const user=await prisma.user.findFirst({
        where:{
            id:userId
        }
    })

    if(!user){
        res.status(404).json({
            message:"user not present"
        })
        return
    }
    try{
        const data=req.body

        const website= await prisma.website.create({
            data:{
                url:data.url as string,
                createdBy: userId as string,
                createdAt:new Date
            }
        })

        if(website){
            res.status(200).json({
                message:"website created successfully",
                website: website.id,
                url:website.url
            })
        }


    }catch(e){
        res.status(403).json({
            message:'something went wrong'
        })
        return
    }
}