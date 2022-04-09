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

        //validate user does not exist
        Services.userService.getUserWithEmail(userData.email).then(existingUser => {
            if (!existingUser){
                Services.userService.registerUser(userData).then(user => {
                    if (!user){
                        res.status(500).send({status: 500, error: "Could not insert user."});
                    } else {
                        res.status(200).send({status: 200});
                    }
                })
            } else {
                res.status(400).send({status: 400, error: "This email is already associated with an account."})
            }
        })
        
    } else {
        res.status(400).send({code: 0, error: errorMessage});
    }
}

module.exports = {
    registerUser
}