/**
 * Timesheet.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user_id: {
      type: 'integer',
      allowNull: false,
    },
    clock_in_out_date: {
      type: 'string',
      allowNull: false,
    },
    clock_in_out_type: {
      type: 'string',
      allowNull: false,
      isIn: [ 'in','out' ],
    },
    clock_in_out_time: {
      type: 'string',
      allowNull: false,
    },
    notes: {
      type: 'string',
      allowNull: true,
    }
  },
  datastore: 'default',

};