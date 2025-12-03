import { describe, test, expect, beforeAll } from '@jest/globals';
import axios from 'axios';
import { baseUrl } from './config';
import { createUser } from './testUtil';

describe("status test", ()=>{
    let token1: string, id1: string
    let token2:string, id2: string

    beforeAll(async () => {
        const user1 = await createUser();
        const user2= await createUser();
        token1 = user1.jwt
        id1 = user1.id
        token2= user2.jwt
        id2=user2.jwt
    })

     test("can fetch website created by user itself", async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/website`, {
                url: "www.google.com"
            }, {
                headers: {
                    Authorization: token1
                }
            });

            const statusResponse= await axios.get(`${baseUrl}/user/status/${res.data.website}`,{
                headers:{
                    Authorization:token1
                }
            })
            expect(res.status).toBe(200)

        } catch (e: any) {
            expect(e.response.status).toBe(404)
        }
    })

    test("cannot fetch website created by other user", async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/website`, {
                url: "www.google.com"
            }, {
                headers: {
                    Authorization: token1
                }
            });

            const statusResponse= await axios.get(`${baseUrl}/user/status/${res.data.website}`,{
                headers:{
                    Authorization:token2
                }
            })
            expect(res.status).toBe(404)

        } catch (e: any) {
            expect(e.response.status).toBe(404)
        }
    })

})