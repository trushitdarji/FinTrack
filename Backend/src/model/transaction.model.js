import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true,
        min:[0,"Amount cannot be a negetive"]
    },
    type:{
        type:String,
        required:true,
        enum:['expense','income']
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

const transactionModel = mongoose.model('Transaction',transactionSchema)

export default transactionModel