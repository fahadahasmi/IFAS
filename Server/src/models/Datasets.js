const mongoose = require('mongoose');

const DatasetName = mongoose.Schema({
    datasetName:{
        type:String,
        required:true
    }
});

const Dataset = mongoose.model("Dataset",DatasetName);

module.exports = Dataset;