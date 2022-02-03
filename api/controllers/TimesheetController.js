/**
 * TimesheetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports =  {
    index: async function(req, res){
        
        const user_id = req.session.User.id;
        const timesheets = await Timesheet.find( { user_id } )
        let last_clock_type = ''

        if(timesheets.length > 0) {
            last_clock_type = timesheets[timesheets.length-1].clock_in_out_type
        } else {
            last_clock_type = 'Clock Out'
        }

        sortedTimesheets = timesheets.sort( (x, y) => x.clock_in_out_datetime > arguments.clock_in_out_datetime ? 1 : -1 )

        res.view('pages/timesheet/index', { timesheets: sortedTimesheets , last_clock_type } );
        
    },
    
    store: async function(req, res){
        const type = req.body.type;
        const datetime = new Date();
        const user_id = req.session.User.id;

        const timesheet = await Timesheet.create({
            user_id,
            clock_in_out_datetime: datetime ,
            clock_in_out_type: type,
        })

        console.log(timesheet)
        
        res.status(200)
        res.redirect('timesheetIndex')
    },
    
    edit: async function(req, res){
        const timesheet = await Timesheet.findOne({id: req.params.id})
            
        const datetime = timesheet.clock_in_out_datetime
        const date = datetime.getFullYear() + '-' + String(datetime.getMonth()+1).padStart(2, '0') + '-' + String(datetime.getDate()).padStart(2, '0')
        const time = String(datetime.getHours()).padStart(2, '0') + ":" + String(datetime.getMinutes()).padStart(2, '0') + ":" + String(datetime.getSeconds()).padStart(2, '0')
        
        res.view('pages/timesheet/edit', {id: timesheet.id, type: timesheet.clock_in_out_type, date: date , time: time})
    },

    update: async function(req, res){
        const user_id = req.session.User.id;
        const date = req.body.date;
        const time = req.body.time;
        const splitedDate = date.split('-')
        const splitedTime = time.split(':')

        const newDateTime = new Date(Date.UTC(  parseFloat(splitedDate[0]),     //year
                                                parseFloat(splitedDate[1])-1,   //month
                                                parseFloat(splitedDate[2]),     //day
                                                parseFloat(splitedTime[0]),     //hour
                                                parseFloat(splitedTime[1]),     //minute
                                                parseFloat(splitedTime[2]),     //seconds
                                                0));
        
        timesheet = await Timesheet.update({id: req.params.id}, {clock_in_out_datetime: newDateTime })
        
        res.redirect('/timesheetIndex')
        return
    },
};

