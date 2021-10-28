const mongoose = require('mongoose');
const StudentDs = require('./StudentDs.js');

const AttendanceRecords = mongoose.Schema({
    className:{
        type:String
    },
    studentName:{
        type:String
    },
    RollNo:{
        type:Number
    }
    ,
    Image:{
        type:String
    },
    Date:{
        type:String
    },
    Attendance:{
        type:String,
        default:'absent'
    }
});

const AttendRecords = mongoose.model('AttendRecords',AttendanceRecords);

module.exports = AttendRecords;