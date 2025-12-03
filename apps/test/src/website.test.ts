import { describe, test, expect, beforeAll } from '@jest/globals';
import axios from 'axios';
import { baseUrl } from './config';
import { createUser } from './testUtil';


describe("website gets created ", () => {
    let token: string, id: string

    beforeAll(async () => {
        const user = await createUser();
        token = user.jwt
        id = user.id
    })

    test('website not created if url is not present', async () => {

        try {

            const res = await axios.post(`${baseUrl}/user/website`, {}, {
                headers: {
                    Authorization: token
                }
            });
            expect(res.status).toBe(404)

        } catch (e: any) {
            expect(e.response.status).toBe(403)
        }
    })


    test("website is created if url is present", async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/website`, {
                url: "https://www.google.com/"
            }, {
                headers: {
                    Authorization: token
                }
            });
            expect(res.status).toBe(200)

        } catch (e: any) {
            expect(e.response.status).toBe(404)
        }
    })

     test("website is not created if url is present but user is not authenticated", async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/website`, {
                url: "https://www.google.com/"
            });
            expect(res.status).toBe(500)

        } catch (e: any) {
            expect(e.response.status).toBe(500)
        }
    })


})






