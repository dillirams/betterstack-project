import { prisma } from "@repo/db";
import { Request, Response } from "express";

export async function websiteStatus(req:Request, res:Response) {
    const userId=req.id;
    const user= await prisma.user.findFirst({
        where:{
        id:userId
       }

    })
     if(!user){
        res.status(404).json({
            message:"user not found"
        })
        return
    }
    try{
        const websiteStatus=await prisma.website.findFirst({
            where:{
                createdBy:userId,
                id:req.params.websiteId
                
            },
            include:{
                ticks:{
                    orderBy:{
                        createdAT:'desc'
                    },
                    take:1
                    
                }
            }
        })

        if(!websiteStatus){
            res.status(404).json({
                message:"website not found"
            })
            return
        }
        res.status(200).json({
            websiteStatus:websiteStatus
        })
    }catch(e){
        res.status(404).json({
            message:"something went wrong"
        })
        console.log(e)
    }
}