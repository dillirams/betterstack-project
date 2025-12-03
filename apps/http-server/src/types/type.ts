import zod from 'zod'

export const requestBody = await zod.object({
    name: zod.string(),
    password: zod.string()
})


export interface DecodeType{
    id:string
}
