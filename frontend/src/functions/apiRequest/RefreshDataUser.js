import url from "../../url"
import Cookies from "js-cookie"

export default async function RefreshDataUser(id) {
    const authToken = Cookies.get('jwt')
    if (!authToken) {
        return ({ status: "FAILED", msg: "No AuthToken,login again" })
    }
    const Request = await fetch(`${url}urls?shortId=${id}`, {
        method: "GET", headers: { 'Content-type': "application/json", Authorization: `Bearer ${authToken}` }
    })
    const Response = await Request.json()
    if (Request.ok) {
        return ({ status: "OK", data: { Response } })
    }
    return ({ status: "FAILED", msg: Response.msg })
}