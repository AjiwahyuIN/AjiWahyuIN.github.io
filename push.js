var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BLtYVw0pkyO5cFGJiPdH7IKGYLUQO0VOvaft3lkWwIChuSBIJJTOl1FWk76qqlGSxVX7TFTqcHl-AAlz_oUWBmo",
    "privateKey": "SO-q2VShaNGNPDg4BzfV7op_wfwP2Qq2XJ0O2a5tUFM"
};


webPush.setVapidDetails(
    'mailto:ajiewahyu24@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eQpKThI5HVw:APA91bHfScRSVba7Oajs8obFUOuCUPgiSlCGTZr0nfW7ESvCdDe-X5mBm3Bh92QQ5GyR-aIs13KLwlhtWG8sHQK96hK_8zZxGQ1L5TTwWCGlRmDnKAJ8R5OZKjQr6m-114RrwArO3yLL",
    "keys": {
        "p256dh": "BCI74ELIrdP4WXqxH/3oGlbnMuYqdL0D63rdMJ/K5GE7NFpLJLc1ebXVVi3EmGtjS9YIORrmGyeqfH6gms7IYbM=",
        "auth": "PpT9FDnfYCc9WRAGn95k5g=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '585307285771',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);