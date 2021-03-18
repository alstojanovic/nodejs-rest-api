module.exports = (req, res, next) => {
    req.filter = 'owned';
    next();
};
