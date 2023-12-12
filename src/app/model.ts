export interface User{
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    permissions: string[]
}
export interface JWT{
    jwt: string
}