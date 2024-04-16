import url from "../../url"

export default async function ShortUrl(inputUrl) {
    const Request = await fetch(`${url}url-stranger`, {
        method: "POST", headers: { 'Content-type': "application/json" }, body: JSON.stringify({
            "url": inputUrl
        })
    })
    const Response = await Request.json()
    if (Request.ok) {
        return ({ status: "OK", data: Response })
    }
    return ({ status: "FAILED", msg: Response.msg })
}