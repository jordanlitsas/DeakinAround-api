var FCM = require('fcm-node');
    var serverKey = 'BHPL71Oy7X61gKuuT7YO-JAd-JEnNxcdetpaRV2_RiOMNsJtC0fvTWINwiFMgfbKQY5RYDGBqsMfSE7uxFpn5S0';
    var fcm = new FCM(serverKey);

    var message = {
	to:'eBfhSH7QQpecS9eoFz42XT:APA91bEfyZFKMwlEc7nlXtS8ckw2iOW-5Wwin066OcLzJiDhbU8L4gwb2XXDHQLwYMq17ht1tRu4K4PC1s2ybjeJPyH0Tz_WhuvWpJVqeWN-_NCHj1s-bRjxw4LzxlznSr0BpXNncxB5',
        notification: {
            title: 'NotifcatioTestAPP',
            body: '{"Message from node js app"}',
        },

        data: { //you can send only notification or only data(or include both)
            title: 'ok cdfsdsdfsd',
            body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
        }

    };

    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!"+err);
			console.log("Respponse:! "+response);
        } else {
            // showToast("Successfully sent with response");
            console.log("Successfully sent with response: ", response);
        }

    });

    