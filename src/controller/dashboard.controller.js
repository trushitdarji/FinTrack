import transactionModel from "../model/transaction.model.js";

async function DashboardSummaryController(req, res, next) {
  try {
    const userId = req.user._id;

    const transaction = await transactionModel.find({
      userId: userId,
    });

    const financialSummary = transaction.reduce(
      (accumulator, currentTransaction) => {
        if (currentTransaction.type === "income") {
          accumulator.income += currentTransaction.amount;
        } else if (currentTransaction.type === "expense") {
          accumulator.expense += currentTransaction.amount;
        }
        return accumulator;
      },
      { income: 0, expense: 0 },
    );

    financialSummary.balance = financialSummary.income - financialSummary.expense
    financialSummary.totalTransactionLen = transaction.length

    return res.status(200).json({
      success:true,
      message:"Dashboard Summery fetched",
      summary:financialSummary
    })

  } catch (err) {
    next(err);
  }
}

export default {
  DashboardSummaryController,
};
