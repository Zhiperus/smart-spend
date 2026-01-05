import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.MONGODB_URL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((err) => {
    console.log("Connection failed:", err);
  });

const newSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    transactions: {
      type: Object,
      required: true,
      totalIncome: { type: Number },
      totalExpense: { type: Number },
      transactionList: { type: Array },
    },
    budgets: {
      type: Object,
      required: true,
      totalSpent: { type: Number },
      totalBudget: { type: Number },
      budgetList: { type: Object },
    },
    pots: {
      type: Object,
      required: true,
      totalSaved: { type: Number },
      potList: { type: Array },
    },
  },
  { minimize: false },
);

const collection = mongoose.model("users", newSchema);

export default collection;
