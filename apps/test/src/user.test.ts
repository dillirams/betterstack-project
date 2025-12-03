import { describe, test, expect } from '@jest/globals';
import axios from "axios"
import { baseUrl } from "./config"

const USER_NAME = Math.random().toString();

describe("signup endpoint", () => {

    test("wont be able to signup if the body is incorrect", async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/signup`, {
                email: USER_NAME,
                password: "randomPassword"
            });
            expect(false).toBe("controll should not be reaching here")
        } catch (e: any) {
            expect(e.response?.status).toBe(404);
        }

    })

    test("will be able to signup if the body is correct", async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/signup`, {
                name: USER_NAME,
                password: "dummyPassword"
            });
            expect(res.status).toBe(201);
            expect(res.data.user).toBeDefined();
            expect(res.data.user.id).toBeDefined();
        } catch (e: any) {
            // Fail the test with a clean error message
            expect(e).toBeUndefined(); // This will fail and show the error
        }
    })

})

describe("signin endpoint", () => {

    test("wont be able to signin if the body is incorrect", async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/signin`, {
                email: USER_NAME,
                password: "randomPassword"
            });
            expect(false).toBe("controll should not be reaching here")
        } catch (e: any) {
            expect(e.response?.status).toBe(404);
        }

    })

    test("will be able to signin if the body is correct", async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/signin`, {
                name: USER_NAME,
                password: "dummyPassword"
            });
            expect(res.status).toBe(200);
            expect(res.data.jwt).toBeDefined();
        } catch (e: any) {
            // Fail the test with a clean error message
            expect(e).toBeUndefined(); // This will fail and show the error
        }
    })

})