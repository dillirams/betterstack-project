import axios from "axios"
import { baseUrl } from "./config"


export async function createUser(): Promise<{
    
    id: string,
    jwt: string
}> {
    const USER_NAME = Math.random().toString();
    
    const signupRes = await axios.post(`${baseUrl}/user/signup`, {
        name: USER_NAME,
        password: "dummyPassword"
    })

    const signinRes = await axios.post(`${baseUrl}/user/signin`, {
        name: USER_NAME,
        password: "dummyPassword"
    })

  

    return {
        id: signupRes.data.user.id,
        jwt: signinRes.data.jwt
    }
}