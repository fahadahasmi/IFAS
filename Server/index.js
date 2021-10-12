require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const auth = require('./src/routers/auth.js');
const dataset = require('./src/routers/dataset.js');
const attend = require('./src/routers/attend.js');
const Port = process.env.PORT || 4000;
const { MONGO_URI } = process.env
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


const staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDb')
})

app.use('/api/auth', auth);
app.use('/api/dataset', dataset);
app.use('/api/attend', attend);

app.listen(Port, () => {
    console.log(`Server running at ${Port}`);
});