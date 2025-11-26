import "dotenv/config";
import { prisma } from "@repo/db";
import express from 'express';

const app = express();
app.use(express.json());

app.post("/user", async (req, res) => {
  try {


    const website = await prisma.website.create({
      data: {
        name: "facebook.com",
        createdAt: new Date(),
      }
    });

    console.log("request made");
    res.json({ success: true, website });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("the app is listening to port 3000");
});
