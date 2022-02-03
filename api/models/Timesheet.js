/**
 * Timesheet.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user_id: {
      type: 'number',
      allowNull: false,
    },
    clock_in_out_datetime: {
      type: 'string',
      allowNull: false,
    },
    clock_in_out_type: {
      type: 'string',
      allowNull: false,
      isIn: [ 'Clock In','Clock Out' ],
    },
  },
  datastore: 'default',

};