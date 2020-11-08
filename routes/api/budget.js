const express = require("express");
const router = express.Router();

const {
  budgetById,
  createBudget,
  getBudget,
  updateBudget,
  deleteBudget,
  getAllBudgets,
} = require("../../controllers/budget");
const { protect, isAuth, authToken } = require("../../controllers/auth");
const { userById } = require("../../controllers/user");

// @route GET /api/budget/:budgetId
// @desc Get budget route
// @access Private
router.get("/:budgetId/:id", protect, isAuth, authToken, getBudget);

// @route POST /api/budget/create
// @desc Create budget route
// @access Private
router.post("/create/:id", protect, isAuth, authToken, createBudget);

// @route PUT /api/budget/:budgetId/:id
// @desc Update budget route
// @access Private
router.put("/:budgetId/:id", protect, isAuth, authToken, updateBudget);

// @route DELETE /api/budget/:budgetId/:id
// @desc Delete budget route
// @access Private
router.delete("/:budgetId/:id", protect, isAuth, authToken, deleteBudget);

// @route GET /api/budget/all/budget
// @desc Get all budget route
// @access Public
router.get("/all/budget/:id", protect, isAuth, authToken, getAllBudgets);

// @route PARAM id
// @desc Get User By Id
// @access Public
router.param("id", userById);

// @route PARAM budgetId
// @desc Get Budget By Id
// @access Public
router.param("budgetId", budgetById);

module.exports = router;
