var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BJC9-DBQ0kwVSAiYkOBTF9WTWlVQIpOgCdxXrMVzAMv2QcGtsK-npCf0FY26fiUjf_PBtnm7RmyXLjXpLwlU8P0",
    "privateKey": "kwlpipC_7KrSzgzPMFmV1w5uzbB6HJXaNySLxKqOAeQ"
};


webPush.setVapidDetails(
    'mailto:ajiewahyu24@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fcXcMZz3Ufs:APA91bF4jMM2KB1JhjbvmRsCSsYC3lShH1sGmwomb9YQYrkJuuv6hikVV1NCT15cjP0hh448OX1ficluyNBKfia8Ed53VMr4hXUu-GZS7Fcq7vjmqmICXJIVHnIl_BQQC93mDcWQS7ha",
    "keys": {
        "p256dh": "BJkNgSIDST+IwUKWVrxcdUoUdP2S2S6Fyiepxt0OqXMh6RPJkguZbGQtqwHcrwtcEPOaMdKf5U4SBD8EgnkfeP8=",
        "auth": "L3mWX4+z+qSixEdXt+K/tg=="
    }
};
var payload = 'Selamat Datang di FootballFromHome';

var options = {
    gcmAPIKey: '585307285771',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);