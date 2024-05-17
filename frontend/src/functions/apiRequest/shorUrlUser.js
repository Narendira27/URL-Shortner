import Cookies from "js-cookie"
import { url } from "../../url"

export default async function ShortUrlUser(inputUrl) {
    const authToken = Cookies.get('jwt')
    if (!authToken) {
        return ({ status: "FAILED", msg: "No AuthToken,login again" })
    }
    const Request = await fetch(`${url}url`, {
        method: "POST", headers: { 'Content-type': "application/json", "Authorization": `Bearer ${authToken}` }, body: JSON.stringify({
            "url": inputUrl
        })
    })
    const Response = await Request.json()
    if (Request.ok) {
        return ({ status: "OK", data: Response })
    }
    return ({ status: "FAILED", msg: Response.msg })
}