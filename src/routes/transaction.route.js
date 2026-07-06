import express from "express"


const transactionRoute = express.Router()

transactionRoute.post("/transaction")

export default transactionRoute