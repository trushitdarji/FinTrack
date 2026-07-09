import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import transactionController from "../controller/transaction.controller.js"


const transactionRoute = express.Router()

transactionRoute.post("/transaction",authMiddleware,transactionController.AddTransactionController)
transactionRoute.get("/transaction",authMiddleware,transactionController.FetchTransactionsController)
transactionRoute.get("/transaction/:id",authMiddleware,transactionController.FetchTransactionByIdController)


export default transactionRoute