/**
 * TimesheetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')

module.exports =  {
    index: async function(req, res){
        
        const user_id = req.session.User.id;
        const timesheets = await Timesheet.find( { user_id } )
        let last_clock_type = ''

        //check latest type of clock
        if(timesheets.length > 0) {
            last_clock_type = timesheets[timesheets.length-1].clock_in_out_type
        } else {
            last_clock_type = 'Clock Out'
        }

        //format date / time to show in index page
        timesheets.forEach(
            (x) => x.clock_in_out_datetime = ( x.clock_in_out_datetime.substr(0,10) + ' ' + x.clock_in_out_datetime.substr(11,8))
        )
        
        //sort list of timesheet
        sortedTimesheets = timesheets.sort( (x, y) => x.clock_in_out_datetime > y.clock_in_out_datetime ? -1 : 1 )

        res.view('pages/timesheet/index', { timesheets: sortedTimesheets , last_clock_type } );
        
    },
    
    store: async function(req, res){
        const type = req.body.type;
        const datetime = moment(new Date()).format()
        const user_id = req.session.User.id;

        const timesheet = await Timesheet.create({
            user_id,
            clock_in_out_datetime: datetime ,
            clock_in_out_type: type,
        })

        res.status(200)
        res.redirect('timesheetIndex')
    },
    
    edit: async function(req, res){
        const timesheet = await Timesheet.findOne({id: req.params.id})
            
        const datetime = new Date(timesheet.clock_in_out_datetime)
        const date = datetime.getFullYear() + '-' + String(datetime.getMonth()+1).padStart(2, '0') + '-' + String(datetime.getDate()).padStart(2, '0')
        const time = String(datetime.getHours()).padStart(2, '0') + ":" + String(datetime.getMinutes()).padStart(2, '0') + ":" + String(datetime.getSeconds()).padStart(2, '0')
        
        res.view('pages/timesheet/edit', {id: timesheet.id, type: timesheet.clock_in_out_type, date: date , time: time})
    },

    update: async function(req, res){
        
        const user_id = req.session.User.id;
        
        //build new datetime edited by user
        const date = req.body.date;
        let time = req.body.time;
        const splitedDate = date.split('-')

        //prevent from Mobile Time objects (does not have seconds)
        if(time.length === 5) {
            time = time + ':00'
        }

        const splitedTime = time.split(':')

        const newDateTime = moment(new Date(parseFloat(splitedDate[0]),     //year
                                            parseFloat(splitedDate[1])-1,   //month
                                            parseFloat(splitedDate[2]),     //day
                                            parseFloat(splitedTime[0]),     //hour
                                            parseFloat(splitedTime[1]),     //minute
                                            parseFloat(splitedTime[2]),     //seconds
                                            0)).format()
        
        
        //fetch list of clocks of the user
        const userTimesheet = await Timesheet.find( { user_id } )
        
        //find current record in the list
        const index = userTimesheet.findIndex( (x) => x.id == req.params.id );
        
        //As the logic of the program does not allow the user to change sorting of records, we can assume that the array will have the record sorted
        //find previous record
        const previousTimesheet = userTimesheet[index-1]
        
        //find next record
        const nextTimesheet = userTimesheet[index+1]
        
        //valid with previous datetime                                            
        if (previousTimesheet) {

            previousDateTime = moment(new Date(previousTimesheet.clock_in_out_datetime)).format()
            
            if (previousDateTime > newDateTime) {
                //previous time cannot be higher than new time. In this case, throw error.
                res.view('pages/timesheet/error', {id: req.params.id, error: 'You are trying to set a lower time than the previous Clock. You must either set a later time than the previous one, or fix the previous times in cascade.'})
                return;
            }
        }
        
        //valid with next datetime
        if (nextTimesheet) {

            nextDateTime = moment(new Date(nextTimesheet.clock_in_out_datetime)).format()
            
            if (nextDateTime < newDateTime) {
                //next time cannot be lower than new time. In this case, throw error.
                res.view('pages/timesheet/error', {id: req.params.id, error: 'You are trying to set a higher time than the next Clock. You must either set an earlier time than the next one, or fix the next times in cascade.'})
                return;
            }
        }

        //commit modification
        timesheet = await Timesheet.update({id: req.params.id}, {clock_in_out_datetime: newDateTime })
        
        res.redirect('/timesheetIndex')
        return
    },
};

