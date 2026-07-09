import transactionModel from "../model/transaction.model.js";

async function AddTransactionController(req, res, next) {
  try {
    const { title, amount, type, category, date } = req.body;

    const userId = req.user._id;

    const transaction = await transactionModel.create({
      title,
      amount,
      type,
      category,
      date,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Item Added Successfully",
      transaction,
    });
  } catch (err) {
    next(err);
  }
}

async function FetchTransactionsController(req, res, next) {
  try {
    const userId = req.user._id;

    const transaction = await transactionModel.find({ userId });

    return res.status(200).json({
      success: true,
      message: "All transaction fetched successfully",
      transaction,
    });
  } catch (err) {
    next(err);
  }
}

export default {
  AddTransactionController,
  FetchTransactionsController,
};
