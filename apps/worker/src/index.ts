import "dotenv/config";

import { xAckBulkto, xReadGroup } from "@repo/redis";
import axios from "axios";
import { prisma } from "@repo/db";
const consumerGroup= process.env.REGION_ID as string
const workerId= process.env.WORKER_ID as string


if(!consumerGroup){
    throw new Error ("consumergroup not provided")
}

if(!workerId){
    throw new Error ("workerId not provided")
}

async function main() {
    while (1) {
        //read from the stream
        const res= await xReadGroup( consumerGroup, workerId);

        
        let streams= res[0].messages
        

        

       let promise= streams.map(async (e:{id:string, message:{url:string, id:string}})=> fetchWebsite(e.id, e.message.url, e.message.id))
        await Promise.all(promise)

        console.log(promise)
        

        //process the website and store the result in the db, it should probably be
        //routed through a queue in a bulk DB request

        // ack back to that event has been processed or not
     //
        
        const ackPayload = streams.map((e: { id: string }) => ({
            consumerGroup,
            streamId: e.id
            }));

     const res3=   await xAckBulkto(ackPayload)

     console.log(res3)
     
     //const res1=   xAck(consumerGroup, "")
    }
}

main()


async function fetchWebsite(streamId:string, websiteUrl:string, websiteId:string, ) {
     return new Promise <void> (async(resolve, reject)=>{

             const id=streamId;
            const url=websiteUrl
            const website=websiteId

            const startTime= Date.now();

           const res = await axios.get(url)
            .then( async()=>{
                const endTime= Date.now();
                const websiteTick= await prisma.websiteTick.create({
                    data:{
                        response_time_ms:endTime-startTime,
                        regionId:consumerGroup,
                        websiteId:website,
                        status:"up"

                    }
                })
                resolve()
            })
            .catch(async()=>{
                 const endTime= Date.now();
                const websiteTick= await prisma.websiteTick.create({
                    data:{
                        response_time_ms:endTime-startTime,
                        regionId:consumerGroup,
                        websiteId:website,
                        status:"down"

                    }
                })
            })
            resolve()
        })
}