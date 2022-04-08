const Services = require('../../services');

const registerUser = async (req, res) => {
    let userData = req.body;
    let errorMessage = "";
    let flag = true;
    

    for (let key in userData){
        if (userData[key] == null || typeof(userData[key]) == 'undefined' || userData[key].toString().length == 0){
            errorMessage += `Missing user information: ${key}.\n`;
            flag = false;
        }
    }

    if (flag){
        //getUser, make sure there is no current user
        Services.userService.registerUser(userData).then(user => {
            if (!user){
                res.status(400).send({code: 0, error: "Could not insert user."});
            } else {
                res.status(200).send({code: 0});
            }
        })
    } else {
        res.status(400).send({code: 0, error: errorMessage});
    }
}

module.exports = {
    registerUser
}