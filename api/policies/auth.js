
module.exports = function(req, res, proceed) {

    if (req.session.authentication) {
        return proceed();
    } else {
        res.view('pages/login/error', {error: 'Sign in before you access this option.'})
    }

}