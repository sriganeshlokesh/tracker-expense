const Expense = require("../models/Expense");
const Budget = require("../models/Budget");

// Get Expense By Id - Middleware
exports.expenseById = (req, res, next, id) => {
  Expense.findById(id).exec((err, expense) => {
    if (err) {
      return res.status(400).json({
        error: "Expense not found",
      });
    }
    req.expense = expense;
    next();
  });
};

// Get an Expense
exports.getExpense = (req, res) => {
  Expense.findOne({ user: req.user.id, _id: req.expense._id }).then(
    (expense) => {
      if (!expense) {
        return res.status(400).json({
          errors: "Expense Not Found",
        });
      } else {
        return res.json(expense);
      }
    }
  );
};

// Create an Expense
exports.createExpense = (req, res) => {
  Expense.findOne({ user: req.user.id, name: req.body.name }).then(
    (expense) => {
      if (expense) {
        return res.status(400).json({
          errors: "Expense Already Exists",
        });
      } else {
        const expense = new Expense({
          name: req.body.name,
          expense: req.body.expense,
          budget: req.body.budget,
          user: req.user.id,
        });
        expense
          .save()
          .then((expense) => {
            if (!expense) {
              return res.status(400).json({
                errors: "Expense not created",
              });
            } else {
              return res.json(expense);
            }
          })
          .catch((err) => {
            return res.status(400).json({
              errors: err,
            });
          });
      }
    }
  );
};

// Update Expense
exports.updateExpense = (req, res) => {
  Expense.findOne({ user: req.user.id, name: req.body.name }).then(
    (expense) => {
      if (expense) {
        return res.status(400).json({
          errors: "Expense Already Exists",
        });
      } else {
        Expense.updateOne(
          { _id: req.expense._id },
          req.body,
          (err, expense) => {
            if (err) {
              return res.status(400).json({
                errors: "Expense not updated",
              });
            }
            return res.json(expense);
          }
        );
      }
    }
  );
};

// Delete Expense
exports.deleteExpense = (req, res) => {
  const expense = req.expense;
  expense.deleteOne((err, expense) => {
    if (err) {
      return res.status(400).json({
        errors: "Expense not deleted",
      });
    }
    return res.json({
      message: "Expense Deleted",
    });
  });
};

// Get all Expenses
exports.getAllExpenses = (req, res) => {
  let errors = {};
  let order = req.query.order ? req.query.order : "asc";
  let limit = req.query.limit && parseInt(req.query.limit);
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  Expense.find({ user: req.user.id })
    .populate("budget")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, expenses) => {
      if (err) {
        errors.expense = "Expense not found";
        return res.status(400).json(errors);
      }
      return res.json(expenses);
    });
};

// Get all Expenses based on Budget
exports.expenseBudget = (req, res) => {
  let errors = {};
  let order = req.query.order ? req.query.order : "asc";
  Expense.find({ user: req.user.id, budget: req.params.budgetId })
    .populate("budget")
    .sort([[order]])
    .exec((err, expenses) => {
      if (err) {
        errors.expense = "Expense not found";
        return res.status(400).json(errors);
      }
      return res.json(expenses);
    });
};

// Increase Budget Capacity after Adding Expense
exports.increaseCapacity = (req, res, next) => {
  Budget.findOne({ _id: req.body.budget }).then((data) => {
    const id = req.body.budget;
    Budget.updateOne(
      { _id: id },
      { $inc: { capacity: req.body.expense } }
    ).then((data) => {
      if (!data) {
        return res.status(400).json({
          errors: "Not Updated",
        });
      }
      next();
    });
  });
};

// Increase Budget Capacity after Adding Expense
exports.decreaseCapacity = (req, res, next) => {
  const expense = req.expense;
  const budgetId = expense.budget;
  Budget.findOne({ _id: budgetId }).then((data) => {
    Budget.updateOne(
      { _id: budgetId },
      { $inc: { capacity: -expense.expense } }
    ).then((data) => {
      if (!data) {
        return res.status(400).json({
          errors: "Not Updated",
        });
      }
      next();
    });
  });
};

// Get Expense Total
exports.getTotal = (req, res) => {
  Expense.find({
    $expr: {
      $gt: ["$expense", 0],
    },
    user: req.user.id,
  }).then((data) => {
    return res.json(data);
  });
};
