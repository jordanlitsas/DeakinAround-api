const FCM = require('fcm-node');
const serverKey = 'AAAAy1yNzVQ:APA91bFr3bJq2pcs4cnsFG5RCcBjzRjBnTAOZlHOuIjxslgvC3HlKMnOoIEBD4NwaMpWic8aPGZxHfwIEdZIJMXNNcAr8qfuEZ4cyF_q_a6MTiiZ7FqLv3cnnEOMU5AJls7O_E_x1ABt';

const sendNotification = (fcm, title, body) => {
    var message = {
        to: fcm,
            notification: {
                title: title,
                body: body,
            }
        };
        const client = new FCM(serverKey);

        client.send(message, function(err, response) {
            if (err) {
                console.log("Something has gone wrong!"+err);
                console.log("Respponse:! "+response);
            } else {
                // showToast("Successfully sent with response");
                console.log("Successfully sent with response: ", response);
            }
    
        });
}
   

    module.exports = {sendNotification}
    