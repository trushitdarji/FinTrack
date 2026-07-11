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

    const { title, amount, type, category, date } = req.body

    const updatedTransaction = await transactionModel.findOneAndUpdate({
      _id:id,
      userId:userId
    },{
      title,
      amount,
      type,
      category,
      date   
    },{
      new:true,
      runValidators:true
    })

    if(!updatedTransaction){
      return res.status(404).json({
        success:false,
        message:"Transaction not found or unauthorized to update"
      })
    }

    return res.status(200).json({
      success:true,
      message:"Trasnaction updated successfully",
      updatedTransaction
    })

    
  } catch (err) {
    next(err);
  }
}

export default {
  AddTransactionController,
  FetchTransactionsController,
  FetchTransactionByIdController,
  UpdateTransacationController,
};
