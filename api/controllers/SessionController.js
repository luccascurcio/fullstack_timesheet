/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    open: function(req, res) {
        res.view('pages/login/signin')
    },

    create: async function(req, res) {
        
        const user = await Users.findOne({email: req.body.email})

        if( !user ) {
            res.view('pages/login/error', {error: 'Email not registered. Try to login again with different credentials or Sign Up.'})
            return;
        }

        if( user.password === req.body.password) {
            req.session.authentication = true;
            req.session.User = user;
            
            res.view('pages/homepage', {})
            return;
        } else {
            
            res.view('pages/login/error', {error: 'Invalid password.'})
            return;
        }
    },

    destroy: function(req, res) {
        req.session.destroy();
        res.redirect('/')
    }

};

