import transactionModel from "../model/transaction.model.js";
import mongoose from "mongoose";

async function AddTransactionController(req, res, next) {
  try {
    const { title, amount, type, category, date } = req.body;

    const userId = req.user._id;
    console.log(req.body);
    console.log(req.user);

    const transaction = await transactionModel.create({
      title,
      amount,
      type,
      category,
      date,
      userId,
    });
    console.log(transaction);

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
    const search = req.query.search;
    const { type, category, from, to } = req.query;

    if (from && to && from > to) {
      return res.status(400).json({
        success: false,
        message: "From date cannot be greater than To date",
      });
    }

    const filter = {
      userId,
    };

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (from || to) {
      filter.date = {};

      if (from) {
        filter.date.$gte = from;
      }

      if (to) {
        filter.date.$lte = to;
      }
    }

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

    const totalTransactions = await transactionModel.countDocuments(filter);
    const transactions = await transactionModel
      .find(filter)
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
async function TransactionSummaryController(req, res, next) {
  try {
    const userId = req.user._id;

    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "From date and To date are required",
      });
    }

    if (new Date(from) > new Date(to)) {
      return res.status(400).json({
        success: false,
        message: "From date cannot be greater than To date",
      });
    }

    const fromDate = new Date(from);

    const toDate = new Date(to);

    // Include the complete To date
    toDate.setHours(23, 59, 59, 999);

    const summary = await transactionModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),

          date: {
            $gte: fromDate,
            $lte: toDate,
          },
        },
      },

      {
        $group: {
          _id: "$type",

          total: {
            $sum: "$amount",
          },

          count: {
            $sum: 1,
          },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;
    let incomeCount = 0;
    let expenseCount = 0;

    summary.forEach((item) => {
      if (item._id === "income") {
        totalIncome = item.total;
        incomeCount = item.count;
      }

      if (item._id === "expense") {
        totalExpense = item.total;
        expenseCount = item.count;
      }
    });

    const totalAmount = totalIncome + totalExpense;

    const incomePercentage =
      totalAmount > 0
        ? Number(((totalIncome / totalAmount) * 100).toFixed(2))
        : 0;

    const expensePercentage =
      totalAmount > 0
        ? Number(((totalExpense / totalAmount) * 100).toFixed(2))
        : 0;

    return res.status(200).json({
      success: true,

      summary: {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        incomePercentage,
        expensePercentage,
        totalTransactions: incomeCount + expenseCount,
      },
    });
  } catch (err) {
    next(err);
  }
}
// async function FilterController(req, res, next) {
//   try {
//     const userId = req.user._id;

//     const { type, category } = req.query;

//     const filter = {
//       userId,
//     };

//     if (type) {
//       filter.type = type;
//     }

//     if (category) {
//       filter.category = category;
//     }

//     const filteredTransactions = await transactionModel.find(filter);

//     return res.status(200).json({
//       success: true,
//       message: "Transactions fetched successfully",
//       filteredTransactions,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

export default {
  AddTransactionController,
  FetchTransactionsController,
  FetchTransactionByIdController,
  UpdateTransacationController,
  DeleteTransactionController,
  // FilterController,
  TransactionSummaryController,
};
