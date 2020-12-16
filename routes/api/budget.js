const express = require("express");
const router = express.Router();

const {
  budgetById,
  createBudget,
  getBudget,
  updateBudget,
  deleteBudget,
  getAllBudgets,
  getTotal,
  monthBudget,
  getBudgetChart,
  getBudgetLine,
} = require("../../controllers/budget");
const { protect, isAuth, authToken } = require("../../controllers/auth");
const { userById } = require("../../controllers/user");

// @route GET /api/budget/:budgetId
// @desc Get budget route
// @access Private
router.get("/:budgetId", protect, authToken, getBudget);

// @route POST /api/budget/create
// @desc Create budget route
// @access Private
router.post("/create", protect, authToken, createBudget);

// @route PUT /api/budget/:budgetId/:id
// @desc Update budget route
// @access Private
router.put("/:budgetId", protect, authToken, updateBudget);

// @route DELETE /api/budget/:budgetId/:id
// @desc Delete budget route
// @access Private
router.delete("/:budgetId", protect, authToken, deleteBudget);

// @route GET /api/budget/all/budget
// @desc Get all budget route
// @access Public
router.get("/all/budget", protect, authToken, getAllBudgets);

// @route GET /api/budget/sum/:id
// @desc Get budget sum route
// @access Public
router.get("/sum/budget", protect, authToken, getTotal);

// @route GET /api/budget/month/:id
// @desc Get budget based on month route
// @access Public
router.get("/month/budget", protect, authToken, monthBudget);

// @route GET /api/budget/month/chart/:id
// @desc Get budget based on month route
// @access Public
router.get("/month/chart", protect, authToken, getBudgetChart);

// @route GET /api/budget/month/chart/:id
// @desc Get budget based on month route
// @access Public
router.get("/line/chart", protect, authToken, getBudgetLine);

// @route PARAM budgetId
// @desc Get Budget By Id
// @access Public
router.param("budgetId", budgetById);

module.exports = router;
