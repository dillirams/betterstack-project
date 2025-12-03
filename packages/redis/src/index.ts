import { createClient } from "@redis/client";

let client: ReturnType<typeof createClient>;

type WebsiteEvent={
    url: string,
    id: string
}

const STREAM_NAME="betteruptime:website"

async function initRedis() {
  client = createClient();
  client.on("error", (err: Error) => console.log("Redis Client Error", err));
  await client.connect();
}

 async function xAdd({ url, id }: WebsiteEvent) {
  await client.xAdd(STREAM_NAME, "*", { url, id });
}

export async function xAddBulkto(websites: WebsiteEvent[]) {
  for (const w of websites) {
    await xAdd(w);
  }
}

export async function xReadGroup(consumerGroup: string, workerId:string):Promise<any> {
    const res= await client.xReadGroup(
  consumerGroup,
  workerId, {
    key: STREAM_NAME,
    id: '>'
  }, {
    COUNT: 5
  }
);

return res
}


type AckType={
  consumerGroup:string,
  streamId:string
}

 async  function xAck(website:AckType){
    const res2= await client.xAck(STREAM_NAME, website.consumerGroup, website.streamId)
}


export async function xAckBulkto(items: AckType[]) {
  return Promise.all(items.map(e => xAck(e)));
}

// IMPORTANT — call init inside a start function
initRedis();




