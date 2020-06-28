const express = require('express');
const app = express();

//IMPORTING ROUTES



//SETTINGS
app.set('port', process.env.PORT || 3000);


//MIDDLEWARES



//STARTING SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});