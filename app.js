const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.use(Express.json());
/** MUST live above any routes (app.use()) **/

// ----- from 3.7 POSTMAN SETUP -----
// app.use('/test', (req,res) => {
//     res.send('This is a message from the test endpoint on the server!')
// });
  // ----- from 3.7 POSTMAN SETUP -----

// ***** 4.2 EXPRESS ROUTER INTRODUCTION *****
const controllers = require ("./controllers");
/*** ^^ just exported from inxex.js ***/ 

app.use("/journal", controllers.journalController);
app.use("/user", controllers.userController);
// ***** 4.2 EXPRESS ROUTER INTRODUCTION *****
// app.use("/about", controllers.journalController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch ((err) => {
        console.log(`[Server]: Server crashed`);
    });
