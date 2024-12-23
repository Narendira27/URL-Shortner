const express = require("express")
const cors = require("cors")
const { z } = require("zod")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { authorizationSchema, urlRequestSchema } = require("./inputValidations")
const { User, Url } = require("./db")

const ShortUniqueId = require('short-unique-id');

require("dotenv").config();
const jwtPass = process.env.jwt
const mailUrl = process.env.mailUrl
const mailPass = process.env.mailPass

const app = express()
app.use(express.json())
app.use(cors())

const uid = new ShortUniqueId({ length: 5 })

const inputValidationMiddleware = (req, res, next) => {
    const body = req.body
    if (req.originalUrl === "/register" || req.originalUrl === "/login") {
        const validate = authorizationSchema.safeParse(body)
        if (!validate.success) {
            return res.status(402).send({ msg: "Input Validation Failed" })
        }
        return next()
    }
    if (req.originalUrl === "/url-stranger" || req.originalUrl === "/url") {
        const validate = urlRequestSchema.safeParse(body)
        if (!validate.success) {
            return res.status(402).send({ msg: "Input Validation Failed" })
        }
        return next()
    }
    res.status(405).send({ msg: "Invalid Request" })
}

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization
    if (!header) {
        return res.status(404).send({ msg: "Jwt Required", authenticated: false })
    }
    const authToken = header.split(" ")[1]
    try {
        const verify = jwt.verify(authToken, jwtPass)
        req.userId = verify.id
        next()
    } catch (e) {
        res.status(403).send({ msg: "Invalid Jwt Token" })
    }
}

app.get("/", (req, res) => {
  res.send({ status: "ok", success: true });
});

app.get("/me", authMiddleware, (req, res) => {
    res.status(200).send({ authenticated: true })
})

app.post("/register", inputValidationMiddleware, async (req, res) => {
    const encryptionSalt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(req.body.password, encryptionSalt)
    try {
        const DbQuery = await User.create({
            email: req.body.email,
            password: encryptPassword
        })
        const mailBody = {
            "user": "Shortner",
            "recipient": req.body.email,
            "url": "https://shortner.narendira.tech"
        }
        const generateToken = jwt.sign({ user: "Shortner" }, mailPass)
        const sendMail = await fetch(mailUrl + "send", { headers: { 'Content-Type': "application/json", 'Authorization': `Bearer ${generateToken}` }, method: "POST", "body": JSON.stringify(mailBody) })
        const response = await sendMail.json()
        if (!response.sent) {
            throw new Error("Resource Cannot be accessed")
        }
        // const token = jwt.sign({ id: DbQuery._id.toString() }, jwtPass)
        // res.status(200).send({ jwt: token })
        res.status(200).send({ msg: "ok" })
    } catch (e) {
        console.log(e)
        res.status(400).send({ msg: e })
    }
})

app.post("/resendMail", async (req, res) => {
    const mailBody = JSON.stringify({
        "user": "Shortner",
        "recipient": req.body.email,
        "url": "https://shortner.narendira.tech"
    })
    const generateToken = jwt.sign({ user: "Shortner" }, mailPass)
    try {
        const sendMail = await fetch(mailUrl + "send", { headers: { 'Content-Type': "application/json", 'Authorization': `Bearer ${generateToken}` }, method: "POST", "body": mailBody })
        const response = await sendMail.json()
        if (!response.sent) {
            throw new Error("Resource Cannot be accessed")
        }
        res.status(200).send({ msg: "Ok" })
    } catch (e) {
        console.log(e)
        res.status(400).send({ msg: e })
    }
})

app.post("/verifyEmail", async (req, res) => {
    try {
        const sendBody = JSON.stringify({
            user: "Shortner",
            token: req.body.token
        })
        const authToken = jwt.sign({ user: "Shortner" }, mailPass)
        const request = await fetch(mailUrl + "verify", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            method: "POST",
            body: sendBody
        })
        const jsonRes = await request.json()
        if (jsonRes.msg === "Invalid inputs") {
            throw new Error("Resource Cannot be accessed")
        }
        const decode = jwt.decode(req.body.token)
        console.log(decode)
        const updateUser = await User.updateOne({ email: decode.email }, { verified: true })
        res.status(200).json({ msg: "Ok" })
    } catch (e) {
        console.log(e)
        res.status(400).send({ msg: e.msg })
    }
})

app.post("/login", inputValidationMiddleware, async (req, res) => {
    try {
        const DbQuery = await User.findOne({ email: req.body.email })
        const id = DbQuery.id.toString()
        const check = bcrypt.compareSync(req.body.password, DbQuery.password)
        const verfiedUser = DbQuery.verified
        if (!verfiedUser) {
            return res.status(403).send({ msg: "User not Verified" })
        }
        if (check) {
            const token = jwt.sign({ id }, jwtPass)
            return res.status(200).send({ jwt: token })
        }
        res.status(403).send({ msg: "Incorrect Password" })
    } catch (e) {
        res.status(500).send({ msg: "User Doesn't Exists" })
    }
})

app.post("/url-stranger", inputValidationMiddleware, async (req, res) => {
    let url = req.body.url
    if (url.length === 0) {
        return res.status(400).send({ "msg": "invalid url / no url" })
    }
    const startwithHttp = url.startsWith("http://")
    const startwithHttps = url.startsWith("https://")
    const fixUrl = startwithHttp || startwithHttps
    if (!fixUrl) {
        url = "https://" + url
    }
    const shortId = uid.rnd()
    try {
        const DbQuery = await Url.create({
            url: url,
            short: shortId,
            owner: "anonymous",
            clicks: 0
        })
        res.send({ url, shortUrl: shortId, clicks: 0 })
    }
    catch (e) {
        res.send({ msg: e.message })
    }
})

app.post("/url", authMiddleware, inputValidationMiddleware, async (req, res) => {
    let url = req.body.url
    if (url.length === 0) {
        return res.status(400).send({ "msg": "invalid url / no url" })
    }
    const startwithHttp = url.startsWith("http://")
    const startwithHttps = url.startsWith("https://")
    const fixUrl = startwithHttp || startwithHttps
    if (!fixUrl) {
        url = "https://" + url
    }
    const shortId = uid.rnd()
    try {
        const DbQuery = await Url.create({
            url: url,
            short: shortId,
            owner: req.userId,
            clicks: 0
        })
        res.status(200).send({ url, shortUrl: shortId, clicks: 0 })
    }
    catch (e) {
        res.status(400).send({ msg: e.message })
    }
})

app.delete("/url", authMiddleware, inputValidationMiddleware, async (req, res) => {
    const shortUrl = req.body.url
    try {
        const DbQuery = await Url.deleteOne({
            short: shortUrl
        })
        res.status(200).send({ msg: "success" })
    }
    catch (e) {
        res.status(400).send({ msg: e.message })
    }
})

app.get("/urls", authMiddleware, async (req, res) => {
    let short = req.query.shortId
    let DbQuery
    try {
        if (!req.query.shortId) {
            DbQuery = await Url.find({ owner: req.userId })
            return res.status(200).send({ urls: [...DbQuery] })
        }
        short = short.replace(/"/g, '');
        DbQuery = await Url.findOne({ owner: req.userId, short })
        if (DbQuery === null) {
            return res.status(420).send({ msg: "Short Id Not Found" })
        }
        return res.status(200).send({ url: DbQuery.url, shortUrl: DbQuery.short, clicks: DbQuery.clicks })
    } catch (e) {
        res.status(500).send({ msg: e.message })
    }
})

app.get("/urls-stranger", async (req, res) => {
    let short = req.query.shortId
    short = short.replace(/"/g, '');
    try {
        const DbQuery = await Url.findOne({ owner: "anonymous", short })
        if (DbQuery === null) {
            return res.status(420).send({ msg: "Short Id Not Found" })
        }
        return res.status(200).send({ url: DbQuery.url, shortUrl: DbQuery.short, clicks: DbQuery.clicks })

    } catch (e) {
        res.status(500).send({ msg: e.message })
    }
})

app.get("/get/:shortPath", async (req, res) => {
    const shortId = req.params.shortPath
    try {
        const DbQuery = await Url.findOne({ short: shortId })
        const UpdatedClicks = DbQuery.clicks + 1
        const DbUpdate = await Url.updateOne({ short: shortId }, { clicks: UpdatedClicks })
        res.redirect(DbQuery.url)
    } catch {
        res.send("error occurred")
    }
})

app.listen(54321, () => { console.log("Server Running at port 54321") })


