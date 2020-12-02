const Budget = require("../models/Budget");

// Get Budget By Id - Middleware
exports.budgetById = (req, res, next, id) => {
  Budget.findById(id).exec((err, budget) => {
    if (err) {
      return res.status(400).json({
        error: "Budget not found",
      });
    }
    req.budget = budget;
    next();
  });
};

// Get a Budget
exports.getBudget = (req, res) => {
  Budget.findOne({ user: req.profile._id, _id: req.budget._id }).then(
    (budget) => {
      if (!budget) {
        return res.status(400).json({
          errors: "Budget Not Found",
        });
      } else {
        return res.json(budget);
      }
    }
  );
};

// Create a Budget
exports.createBudget = (req, res) => {
  const today = new Date();
  Budget.findOne({
    user: req.params.id,
    name: req.body.name,
    month: req.body.month,
  }).then((budget) => {
    if (budget) {
      return res.status(400).json({
        errors: "Budget Already Exists",
      });
    } else {
      const budget = new Budget({
        name: req.body.name,
        budget: req.body.budget,
        user: req.params.id,
        month: req.body.month,
      });
      budget
        .save()
        .then((budget) => {
          if (!budget) {
            return res.status(400).json({
              errors: "Budget not created",
            });
          } else {
            return res.json(budget);
          }
        })
        .catch((err) => console.log(err));
    }
  });
};

// Update Budget
exports.updateBudget = (req, res) => {
  Budget.findOne({ name: req.body.name }).then((budget) => {
    if (budget) {
      return res.status(400).json({
        errors: "Budget Already Exists",
      });
    } else {
      Budget.updateOne({ _id: req.budget._id }, req.body, (err, budget) => {
        if (err) {
          return res.status(400).json({
            errors: "Budget not updated",
          });
        }
        return res.json(budget);
      });
    }
  });
};

// Delete Budget
exports.deleteBudget = (req, res) => {
  const budget = req.budget;
  budget.deleteOne((err, budget) => {
    if (err) {
      return res.status(400).json({
        errors: "Budget not deleted",
      });
    }
    return res.json({
      message: "Budget Deleted",
    });
  });
};

// Get all Budgets
exports.getAllBudgets = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let limit = req.query.limit && parseInt(req.query.limit);
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  Budget.find({ user: req.params.id })
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, budgets) => {
      if (err) {
        return res.status(400).json({
          errors: err,
        });
      }
      return res.json(budgets);
    });
};

exports.getBudgetChart = (req, res) => {
  const month = parseInt(req.query.month);
  const year = parseInt(req.query.year);
  Budget.aggregate(
    [
      { $limit: 5 },
      {
        $project: {
          doc: "$$ROOT",
          year: { $year: "$month" },
          month: { $month: "$month" },
        },
      },
      { $match: { month: month, year: year } },
    ],
    (err, budgets) => {
      if (err) {
        return res.status(400).json({
          errors: err,
        });
      }
      return res.json(budgets);
    }
  );
};

// Get Budget Total
exports.getTotal = (req, res) => {
  Budget.aggregate(
    [
      {
        $match: { user: req.profile._id },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$budget",
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(data);
    }
  );
};

// Budget & Expense Based on Month
exports.monthBudget = (req, res) => {
  Budget.aggregate(
    [
      {
        $match: { user: req.profile._id },
      },
      {
        $group: {
          _id: { $month: "$month" },
          total: {
            $sum: "$budget",
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(data);
    }
  );
};
