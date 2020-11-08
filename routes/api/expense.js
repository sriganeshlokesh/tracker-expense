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
} = require("../../controllers/expense");
const { protect, isAuth } = require("../../controllers/auth");
const { userById } = require("../../controllers/user");

// @route GET /api/expense/:expenseId
// @desc Get expense route
// @access Private
router.get("/:expenseId/:id", protect, isAuth, getExpense);

// @route POST /api/expense/create
// @desc Create expense route
// @access Private
router.post("/create/:id", protect, isAuth, createExpense);

// @route PUT /api/expense/:expenseId/:id
// @desc Update expense route
// @access Private
router.put("/:expenseId/:id", protect, isAuth, updateExpense);

// @route DELETE /api/expense/:expenseId/:id
// @desc Delete expense route
// @access Private
router.delete("/:expenseId/:id", protect, isAuth, deleteExpense);

// @route GET /api/expense/all/expense
// @desc Get all expense route
// @access Public
router.get("/all/expense/:id", protect, isAuth, getAllExpenses);

// @route GET /api/expense/all/expense/:id/:budgetId
// @desc Get all expense based on budget route
// @access Public
router.get("/all/expense/:id/:budgetId", protect, isAuth, expenseBudget);

// @route PARAM id
// @desc Get User By Id
// @access Public
router.param("id", userById);

// @route PARAM budgetId
// @desc Get Budget By Id
// @access Public
router.param("expenseId", expenseById);

module.exports = router;
