import { url } from "@/url"

export default async function ResendMail(email) {
    const request = await fetch(url + "resendMail", { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify({ email }) })
    const resJson = await request.json()
    console.log(resJson)
    if (resJson.msg === "Ok") {
        return ({ msg: "OK" })
    }
    return ({ msg: "failed" })
}