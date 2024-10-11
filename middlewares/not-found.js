function notFoundMiddleware(req, res, next) {
    res.render('shared/404');
}

module.exports = notFoundMiddleware;