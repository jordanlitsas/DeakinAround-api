const Services = require('../../services');
const userPageCollection = require('../../services/database/userPageDocConnection');
const userCollection = require('../../services/database/userDocConnection');
const notificationService = require('../../services/users/notificationService')
const { userService } = require('../../services');

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

            let newUser = await userCollection.registerUser(userData);
            if (!newUser){
                res.status(500).send({error: "User not inserted."})
            } else {
                let newUserPagesDoc = await userPageCollection.createDoc(newUser._id);
                if (!newUserPagesDoc){
                    res.status(500).send({error: "UserPage doc not inserted."})
                } else {
                    // notificationService.sendNotification(newUser.fcmToken, "Welcome to DeakinAround", "Your home of Deakin events.");
                    res.status(200).send({user_id: newUser._id});
                }
            }
        } else {
            res.status(400).send({error: "This email is taken."})
        }
}

const loginUser = async (req, res) => {
    let auth = req.body.auth;
    Services.userService.getUserWithAuth(auth).then(retrievedUser => {
        console.log(retrievedUser)
        if (!retrievedUser){
            res.status(204).send()
        } else{
            // notificationService.sendNotification(retrievedUser.fcmToken, "Welcome back");
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

const configUserAuth = async (req ,res) => {
    let user_id = req.body.user_id;
    let auth = req.body.auth;
    console.log(req.body)
    userService.configUserAuth(user_id, auth).then(success => {
        if (!success){
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    })
}

const addNotificationToken = async (req, res) => {
    let user_id = req.body.user_id;
    let token = req.body.token;
    console.log(user_id)
    console.log(token)
    userCollection.addNotificationToken(user_id, token).then(success => {
        if (success){
            res.status(200).send();
        } else {
            res.status(500).send();
        }
    })
}


module.exports = {
    registerUser,
    loginUser,
    configUserAuth,
    getUserWithUserId,
    addNotificationToken
}