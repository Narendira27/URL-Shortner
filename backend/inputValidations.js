const { z } = require("zod")

const authorizationSchema = z.object({
    "email": z.string().email(),
    "password": z.string().min(8)
})

const urlRequestSchema = z.object({
    "url": z.string()
})

module.exports = { authorizationSchema, urlRequestSchema }