/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    find: function(req, res) {
        Users.findOne({id: req.body.id}).exec( (err, user) => {
            if(err) {
                res.send( 500, {error: 'User was not found.'})
            }
            res.send( 200, user )
        } )
    },

    store: async function(req, res){
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        
        const userExists = await Users.findOne( {email} )

        if (userExists) {
            res.view('pages/login/error', {error: 'Email already registered. Try to login again or Sign Up using a different email.'})
            return;
        }
        
        await Users.create({
            email,
            password ,
            name,
        })

        //session for new user
        const user = await Users.findOne({email: email})
        
        req.session.authentication = true;
        req.session.User = user;
        res.view('pages/homepage', {})
    },

    show: function (req, res) {
        
        //redirect to home page. Must be a controller, so policies are applied
        res.view('pages/homepage')
    }

};

