import { url } from "../../url"

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
            return ({ status: "OK" })
        }

        if (Response.msg.code === 11000) {
            return ({ status: "FAILED", msg: "User already exists" })
        }
        const ResponseErrMsg = Response.msg.errorResponse

        return ({ status: "FAILED", msg: ResponseErrMsg.errmsg })
    }
    return ({ status: "FAILED", msg: "Password doesn't match" })
}