import "dotenv/config";
import { prisma} from "@repo/db"
import { xAddBulkto } from "@repo/redis"

async function main() {
    let website= await prisma.website.findMany({
        select:{
            url:true,
            id:true
        }
    });
    console.log(website)

    await xAddBulkto(website.map(w=>({
        url: w.url,
        id: w.id
    })))
}



setInterval(() => {
    main()
}, 3*1000*60);

main()