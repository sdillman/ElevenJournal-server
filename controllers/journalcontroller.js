    // ***** 4.2 EXPRESS ROUTER INTRODUCTION *****
const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!');
    // ^^ handler function
});

router.get('/about', (req, res) => {
    res.send('This is the about route!');
    // ^^ handler function
});

router.get('/user', (req, res) => {
    res.send('This is the user route!');
    // ^^ handler function
});

module.exports = router;
    // ***** 4.2 EXPRESS ROUTER INTRODUCTION *****