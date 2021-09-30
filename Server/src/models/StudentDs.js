const mongoose = require('mongoose');


const StudentDs = mongoose.Schema({
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
    }
});

const StudentDataset = mongoose.model('StudentDataset',StudentDs);

module.exports = StudentDataset;