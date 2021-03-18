const catchAsync = require('../errors/catchAsync');
const NotFoundError = require('../errors/types/notFoundError');
const APIFeatures = require('./../utils/apiFeatures');

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: doc,
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findById(req.params.id);
        if (!doc) {
            return next(new NotFoundError('No document found with that ID'));
        }

        Object.keys(req.body).forEach((key) => (doc[key] = req.body[key]));
        await doc.save();

        res.status(200).json({
            status: 'success',
            data: doc,
        });
    });

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            return next(new NotFoundError('No document found with that ID'));
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    });

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;
        if (!doc) {
            return next(new NotFoundError('No document found with that ID'));
        }

        res.status(200).json({
            status: 'success',
            data: doc,
        });
    });

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        let filter = {};
        if (req.filter === 'owned') filter = { owner: req.user.id };

        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .paginate();

        const docs = await features.query;

        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: docs,
        });
    });
