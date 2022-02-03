/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //Controller Routes
  '/': 'SessionController.open',
  '/signin': 'SessionController.open',
  '/session/create/:email': 'SessionController.create',
  
  '/home': 'UsersController.show',
  '/users/store': 'UsersController.store',
  
  '/timesheetIndex': 'TimesheetController.index',
  '/timesheetStore': 'TimesheetController.store',
  '/timesheetUpdate/:id': 'TimesheetController.update',
  '/timesheetEdit/:id': 'TimesheetController.edit',

  //View Routes
  '/signup': { view: 'pages/login/signup' },
  '/loginError': { view: 'pages/login/error' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
