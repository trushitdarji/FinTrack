import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import transactionController from "../controller/transaction.controller.js"
import validate from "../middleware/validate.middleware.js"
import transactionSchema from "../validation/transaction.validation.js"


const transactionRoute = express.Router()

transactionRoute.post("/transaction",authMiddleware,validate(transactionSchema),transactionController.AddTransactionController)
transactionRoute.get("/transaction",authMiddleware,transactionController.FetchTransactionsController)
transactionRoute.get("/transaction/filter",authMiddleware,transactionController.FilterController)
transactionRoute.get("/transaction/:id",authMiddleware,transactionController.FetchTransactionByIdController)
transactionRoute.put("/transaction/:id",authMiddleware,transactionController.UpdateTransacationController)
transactionRoute.delete("/transaction/:id",authMiddleware,transactionController.DeleteTransactionController)


export default transactionRoute