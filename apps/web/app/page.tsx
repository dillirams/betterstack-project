//import styles from "./page.module.css";
import { prisma } from "@repo/db";

export default async function Home() {
  const user = await prisma.website.create({
    data:{
      name:"google.com",
      "createdAt": new Date
    }
  }) 

  const allWebsite=await prisma.website.findMany();
  return (
    <div >
      {user?.name ?? "No user added yet"};
      <div>
        {JSON.stringify(allWebsite)}
      </div>
    </div>
  );
}