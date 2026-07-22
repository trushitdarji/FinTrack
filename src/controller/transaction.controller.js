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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "desc";

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be greater than 0",
      });
    }

    if (sort !== "asc" && sort !== "desc") {
      return res.status(400).json({
        success: false,
        message: "Sort must be either 'asc' or 'desc'",
      });
    }

    let sortOrder;

    if (sort == "desc") {
      sortOrder = -1;
    } else {
      sortOrder = 1;
    }

    const totalTransactions = await transactionModel.countDocuments({ userId });
    const transactions = await transactionModel
      .find({ userId })
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalTransactions / limit);

    return res.status(200).json({
      success: true,
      message: "All transactions fetched successfully",
      transactions,
      currentPage: page,
      pageSize: limit,
      totalPages,
      totalTransactions,
    });
  } catch (err) {
    next(err);
  }
}

async function FetchTransactionByIdController(req, res, next) {
  try {
    const id = req.params.id;

    const userId = req.user._id;

    const transaction = await transactionModel.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction Not Found",
      });
    }

    if (transaction.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction fetched successfully",
      transaction,
    });
  } catch (err) {
    next(err);
  }
}

async function UpdateTransacationController(req, res, next) {
  try {
    const id = req.params.id;

    const userId = req.user._id;

    const { title, amount, type, category, date } = req.body;

    const updatedTransaction = await transactionModel.findOneAndUpdate(
      {
        _id: id,
        userId: userId,
      },
      {
        title,
        amount,
        type,
        category,
        date,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found or unauthorized to update",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trasnaction updated successfully",
      updatedTransaction,
    });
  } catch (err) {
    next(err);
  }
}

async function DeleteTransactionController(req, res, next) {
  try {
    const id = req.params.id;

    const userId = req.user._id;

    const transaction = await transactionModel.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction Not Found or Unauthorized to delete",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction Deleted Successfully",
      transaction,
    });
  } catch (err) {
    next(err);
  }
}

async function FilterController(req, res, next) {
  try {
    const userId = req.user._id;

    const { type, category } = req.query;

    const filter = {
      userId,
    };

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    const filteredTransactions = await transactionModel.find(filter);

    return res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      filteredTransactions,
    });
  } catch (err) {
    next(err);
  }
}

export default {
  AddTransactionController,
  FetchTransactionsController,
  FetchTransactionByIdController,
  UpdateTransacationController,
  DeleteTransactionController,
  FilterController,
};
