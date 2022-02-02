/**
 * TimesheetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports =  {
    index: function(req, res){
        Timesheet.find({}).exec( (err, timesheets) => {
            if(err){
                res.send(500, {error: 'Error loading database'})
            }
            res.view('pages/timesheet/index', {timesheets: timesheets});
        })
    },
    store: function(req, res){
        const type = req.body.type;
        const current_date = new Date();
        const date = current_date.getFullYear() + '-' + (current_date.getMonth() + 1) + '-' + current_date.getDate();
        const time = current_date.getHours() + ":" + current_date.getMinutes() + ":" + current_date.getSeconds();
        const notes = req.body.notes;
        const user_id = 3;

        Timesheet.create({
            user_id,
            clock_in_out_date: date ,
            clock_in_out_type: type,
            clock_in_out_time: time,
            notes: notes,
        }).exec( (err) => {
            if(err){
                res.send(500, {error: 'Error while creating a new record. Check with system administrator.'})
            }
            res.redirect('timesheetIndex')
        })
    },
    edit: function(req, res){
        Timesheet.findOne({
            id: req.params.id
        }).exec( (err, timesheet) => {
            if(err){
                res.send(500, {error: 'Error while fetching the record. Check with system administrator.'})
            }
            res.view('pages/timesheet/edit', {timesheet: timesheet})
        })
        
    }
};

