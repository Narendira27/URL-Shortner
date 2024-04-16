import url from "../../url"

export default async function RefreshData(id) {
    const Request = await fetch(`${url}urls-stranger?shortId=${id}`, {
        method: "GET", headers: { 'Content-type': "application/json" }
    })
    const Response = await Request.json()
    if (Request.ok) {
        return ({ status: "OK", data: Response })
    }
    return ({ status: "FAILED", msg: Response.msg })
}