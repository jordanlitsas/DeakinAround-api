const Services = require('../../services');
const userPageCollection = require('../../services/database/userPageDocConnection');
const userCollection = require('../../services/database/userDocConnection');

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

        let existingUser = await userCollection.getUserWithAuth(userData.auth);
        if (!existingUser){
            let newUser = await userCollection.registerUser(userData);
            if (!newUser){
                res.status(500).send({error: "User not inserted."})
            } else {
                let newUserPagesDoc = await userPageCollection.createDoc(newUser._id);
                if (!newUserPagesDoc){
                    res.status(500).send({error: "UserPage doc not inserted."})
                } else {
                    res.status(200).send({user_id: newUser._id});
                }
            }
        } else {
            res.status(400).send({error: "This email is taken."})
        }
    }
}

const loginUser = async (req, res) => {
//     //handle authentication - refactor to use OAUTH

    let auth = req.body.auth;
    console.log(auth)
    Services.userService.getUserWithAuth(auth).then(retrievedUser => {
        console.log(retrievedUser)
        if (!retrievedUser){
            res.status(204).send()
        } else{
            res.status(200).send({user_id: retrievedUser._id, firstName: retrievedUser.firstName});
        } 
    });
}

const getUserWithUserId = async (req, res) => {
    let userId = req.query.userId;
    Services.userService.getUserWithUserId(userId).then(retrievedUser => {
        if (!retrievedUser){
            res.status(204).send();
        } else {
            res.status(200).send(retrievedUser);
        }
    })
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
    // updateUser,
    getUserWithUserId
}