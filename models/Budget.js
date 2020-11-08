const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 32,
    },
    budget: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema, "budgets");
