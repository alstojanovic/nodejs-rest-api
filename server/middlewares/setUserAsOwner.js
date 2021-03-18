module.exports = (req, res, next) => {
    req.body.owner = req.user.id;
    next();
};
