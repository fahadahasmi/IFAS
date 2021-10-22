const mongoose = require('mongoose');

const DatasetName = mongoose.Schema({
    userName:{
        type:String,
    },
    datasetName:{
        type:String,
        required:true
    }
});

const Dataset = mongoose.model("Dataset",DatasetName);

module.exports = Dataset;