export interface User{
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    roles: Permission[]
}
export interface JWT{
    jwt: string
}
export interface RoleType{
    role: string
}
export interface Permission{
    id: number,
    role: string
}