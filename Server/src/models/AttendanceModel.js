const mongoose = require('mongoose');

const AttendanceRecords = mongoose.Schema({
    className:{
        type:String
    },
    studentName:{
        type:String
    },
    RollNo:{
        type:Number,
        unique:true,
    }
    ,
    Image:{
        type:String
    },
    Date:{
        type:String,
        unique:true,
    },
    Attendance:{
        type:String,
        default:'absent'
    }
});

const AttendRecords = mongoose.model('AttendRecords',AttendanceRecords);

module.exports = AttendRecords;