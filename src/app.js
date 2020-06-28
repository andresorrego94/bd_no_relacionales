const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
//npm run dev
//https://www.youtube.com/watch?v=3J925fRl_UE   minuto 36.55

//CONNECT DB
// const uri = "mongodb+srv://userbdnr@admin:userbdnr@wikisbdnr-wofzi.azure.mongodb.net/wikis?retryWrites=true&w=majority";
// mongoose.connect('mongodb+srv://userbdnr@admin:secreta@wikisbdnr-wofzi.azure.mongodb.net/WikisBDNR?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
//     .then( db => console.log('DB connected'))
//     .catch( err => console.log(err))

mongoose.connect('mongodb+srv://userbdnr:secreta@wikisbdnr-wofzi.azure.mongodb.net/', {dbName: 'wikisDB', useUnifiedTopology: true })
    .then( db => console.log('DB connected'))
    .catch( err => console.log(err))
//IMPORTING ROUTES
const indexRoutes = require('./routes/index');


//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded( {extended: false} ));


//ROUTES
app.use('/', indexRoutes);

//STARTING SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
