import url from "../../url"
import Cookies from "js-cookie"

export default async function AuthCheck() {
    const authToken = Cookies.get('jwt')
    if (!authToken) {
        return ({ status: "FAILED", msg: "No AuthToken" })
    }
    const Request = await fetch(`${url}me`, {
        method: "GET", headers: { 'Content-type': "application/json", 'Authorization': `Bearer ${authToken}` }
    })
    const Response = await Request.json()
    if (Request.ok) {
        return ({ status: "OK", jwt: Response.jwt })
    }
    return ({ status: "FAILED", msg: Response.msg })
}