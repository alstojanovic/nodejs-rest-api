const Deposit = require('../db/models/depositModel');
const catchAsync = require('../errors/catchAsync');
const factory = require('./handlerFactory');

exports.createDeposit = factory.createOne(Deposit);
exports.getDeposit = factory.getOne(Deposit);
exports.getAllDeposits = factory.getAll(Deposit);
exports.updateDeposit = factory.updateOne(Deposit);
exports.deleteDeposit = factory.deleteOne(Deposit);

exports.generateReport = catchAsync(async (req, res, next) => {
    queryObj = { owner: req.params.id };
    if (req.query.startDate) queryObj.endDate = { $gte: req.query.startDate };
    if (req.query.endDate) queryObj.startDate = { $lte: req.query.endDate };

    const deposits = await Deposit.find(queryObj);

    let totalRevenue = 0;
    const depositsList = [];
    deposits.forEach((deposit) => {
        const startDate = req.query.startDate
            ? Math.max(deposit.startDate, new Date(req.query.startDate))
            : deposit.startDate;
        const endDate = req.query.endDate
            ? Math.min(deposit.endDate, new Date(req.query.endDate))
            : deposit.endDate;

        const days = (endDate - startDate) / 1000 / 60 / 60 / 24 + 1;

        const revenue =
            ((deposit.amount * (deposit.interest / 100)) / 360) * days;

        const revenueAfterTax =
            revenue > 0 ? revenue * (1 - deposit.tax / 100) : revenue;

        totalRevenue += revenueAfterTax;

        depositsList.push({
            _id: deposit._id,
            bankName: deposit.bankName,
            accountNumber: deposit.accountNumber,
            startDate: deposit.startDate,
            endDate: deposit.endDate,
            amount: deposit.amount,
            interest: deposit.interest,
            tax: deposit.tax,
            revenue,
            revenueAfterTax,
        });
    });

    res.status(200).json({
        status: 'success',
        data: { deposits: depositsList, revenue: totalRevenue },
    });
});
