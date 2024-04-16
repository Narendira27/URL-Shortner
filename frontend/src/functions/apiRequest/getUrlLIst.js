import Cookies from "js-cookie"
import url from "../../url"


export default async function GetUrlList() {
    const AuthToken = Cookies.get('jwt')
    if (!AuthToken) {
        return ({ status: "FAILED", msg: "No AuthToken" })
    }
    const Request = await fetch(`${url}urls`, { method: "GET", headers: { 'Content-type': "application/json", Authorization: `Bearer ${AuthToken}` } })
    const Response = await Request.json()
    if (Request.ok) {
        return ({ status: "OK", data: Response })
    } else {
        return ({ status: "FAILED", msg: Response.msg })
    }
}