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
                        res.status(500).send({error: "Could not insert user."});
                    } else {

                        //validate user before login
                        Services.userService.validateUser(user._id).then(validatedUser => {
                            if (validatedUser){
                                res.status(200).send({userId: user._id});
                            } else {
                                //handle invalid user
                            }
                        })
                        
                    }
                })
            } else {
                res.status(400).send({error: "This email is already associated with an account."})
            }
        })
        
    } else {
        res.status(400).send({code: 0, error: errorMessage});
    }
}

const loginUser = async (req, res) => {
    //handle authentication - refactor to use OAUTH

    let userData = req.body;
    Services.getUserWithEmail(userData.email).then(retrievedUser => {
        if (!retrievedUser){
            res.status(204).send({error: "Email or password is incorrect."})
        } 
        else if (retrievedUser.email == userData.email){
            res.status(200).send({userId: retrievedUser._id});
        } 
    })
}

const getUserWithUserId = async (req, res) => {
    let userId = req.params.userId;
    res.send(userId);
}

//Updates user when logged in with _id that is returned with login response
const updateUser = async (req, res) => {

    let userId = req.body.userId;
    let updateData = req.body.updateData;

    //validate user
    let validatedUser = await Services.userService.validateUser(userId); 

    if (validatedUser){
        Services.userService.updateUserWithUserId(userId, updateData).then(updatedUser => {
            if (!updatedUser){
                res.status(400).send({error: "User could not be updated."});
            } 
            res.status(200).send();
        })
    } else {
        res.status(400).send({error: "userId is not valid."});
    }

}

// const deleteUserWithUserId = async (req, res) => {
//     let userId = req.body.userId;
//     let validatedUser = await Services.userService.validateUser(userId);
    
//     if (validatedUser){

//         //match userId with password
//         //authent
//         Services.userService.deleteUserWithUserId(userId).then(validatedUser => {
//             if (!validatedUser){
//                 res.status(204).send(error: "user")
//             }
//         })

//     }

// }

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getUserWithUserId
}