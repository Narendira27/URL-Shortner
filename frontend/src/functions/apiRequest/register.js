import url from "../../url"

export default async function RegisterHandler(registerData) {
    if (registerData.password === registerData.passwordConfirmation) {
        const Request = await fetch(`${url}register`, {
            method: "POST", headers: { 'Content-type': "application/json" }, body: JSON.stringify({
                "email": registerData.email,
                "password": registerData.password
            })
        })
        const Response = await Request.json()
        if (Request.ok) {
            return ({ status: "OK", jwt: Response.jwt })
        }
        return ({ status: "FAILED", msg: Response.msg })
    }
    return ({ status: "FAILED", msg: "Password doesn't match" })
}