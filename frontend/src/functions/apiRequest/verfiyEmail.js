import { url } from "@/url"

export default async function VerifyEmail(token) {
    const request = await fetch(url + "verifyEmail", { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify({ token }) })
    const resJson = await request.json()
    if (resJson.msg === "Ok") {
        return ({ status: "OK" })
    }
    return ({ status: "failed" })
}