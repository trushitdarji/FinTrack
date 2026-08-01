import * as z from "zod";

const transactionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  amount: z.number().positive("Amount must be positive number"),
  type: z.enum(["income", "expense"]),
  category: z.enum([
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Other",
  ]),
  date: z.string(),
});

export default transactionSchema;