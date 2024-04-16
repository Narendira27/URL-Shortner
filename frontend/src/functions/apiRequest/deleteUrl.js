import Cookies from "js-cookie";
import url from '../../url'

export default async function DeleteUrl(userUrl) {
    const authToken = Cookies.get("jwt")
    if (!authToken) {
        return ({ status: 'FAILED', msg: "Jwt Token Not Found" })
    }
    const Request = await fetch(`${url}url`, { method: "DELETE", headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${authToken}` }, body: JSON.stringify({ "url": userUrl }) })
    const Response = await Request.json()
    if (Request.ok) {
        return ({ status: "OK", msg: "Deleted Successfully" })
    } else {
        return ({ status: 'FAILED', msg: Response.msg })
    }
}