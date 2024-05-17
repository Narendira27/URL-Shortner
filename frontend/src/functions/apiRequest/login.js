import { url } from "../../url"

export default async function LoginHandler(loginData) {
    const Request = await fetch(`${url}login`, {
        method: "POST", headers: { 'Content-type': "application/json" }, body: JSON.stringify({
            "email": loginData.email,
            "password": loginData.password
        })
    })
    const Response = await Request.json()
    if (Request.ok) {
        return ({ status: "OK", jwt: Response.jwt })
    }
    return ({ status: "FAILED", msg: Response.msg })
}