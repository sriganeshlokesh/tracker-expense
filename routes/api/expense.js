const express = require("express");
const router = express.Router();

const {
  expenseById,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
  expenseBudget,
  increaseCapacity,
  getTotal,
  decreaseCapacity,
} = require("../../controllers/expense");
const { protect, authToken } = require("../../controllers/auth");

// @route GET /api/expense/:expenseId
// @desc Get expense route
// @access Private
router.get("/:expenseId", protect, authToken, getExpense);

// @route POST /api/expense/create
// @desc Create expense route
// @access Private
router.post("/create", protect, authToken, increaseCapacity, createExpense);

// @route PUT /api/expense/:expenseId/:id
// @desc Update expense route
// @access Private
router.put("/:expenseId", protect, authToken, updateExpense);

// @route DELETE /api/expense/:expenseId/:id
// @desc Delete expense route
// @access Private
router.delete(
  "/:expenseId",
  protect,
  authToken,
  decreaseCapacity,
  deleteExpense
);

// @route GET /api/expense/all/expense
// @desc Get all expense route
// @access Public
router.get("/all/expense", protect, authToken, getAllExpenses);

// @route GET /api/expense/all/expense/:id/:budgetId
// @desc Get all expense based on budget route
// @access Public
router.get("/all/expense/:budgetId", protect, authToken, expenseBudget);

// @route GET /api/expense/sum/expense/:id
// @desc Get expense sum route
// @access Public
router.get("/sum/expense", protect, authToken, getTotal);

// @route PARAM budgetId
// @desc Get Budget By Id
// @access Public
router.param("expenseId", expenseById);

module.exports = router;
