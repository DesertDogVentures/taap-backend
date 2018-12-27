var env =  process.argv[2] || process.env.NODE_ENV || 'local';

var config = {
    "local":{
        "database":{
            connectionLimit : 100, 
            host     : '34.210.32.133',
            user     : 'root',
            password : '**tap$$app**',
            database : 'tapapp_staging',
            debug    :  false
        },
        "redis":{
            secret_key : 'demo',
            host : '127.0.0.1',
            port:6379
        },
        "jwt":{
            secret_key : 'demo',
            exprireTime : '365 days'
        },
        "apn" :{
            publicKeyPath : "F:/ClientProjects/taap-backend/certificates/APNsdev.pem",
            privateKeyPath : "F:/ClientProjects/taap-backend/certificates/keydev.pem",
            passphrase : 'paxcel@123',
            isProduction : false
        },
        "URL_PREFIX":"/tapapp",
        "PATH_SEPERATOR":"\\",
        "ASSET_BASE_PATH" : 'F:/ClientProjects/assets',
        "PORT":3000
    },
    "development":{
        "database":{
            connectionLimit : 100, 
            host     : '192.168.15.11',
            user     : 'root',
            password : 'T@apapp@321',
            database : 'tapapp',
            debug    :  false
        },
        "redis":{
            secret_key : 'demo',
            host : '127.0.0.1',
            port:6379
        },
        "jwt":{
            secret_key : 'demo',
            exprireTime : '365 days'
        },
        "apn" :{
            publicKeyPath : "/home/tapapp/opt/Tapapp-backend/certificates/APNs.pem",
            privateKeyPath : "/home/tapapp/opt/Tapapp-backend/certificates/key.pem",
            passphrase : 'paxcel@123',
            isProduction : false
        },
        "URL_PREFIX":"/tapapp",
        "PATH_SEPERATOR":"/",
        "ASSET_BASE_PATH" : '/home/tapapp/opt/Tapapp-backend/assets/',
        "PORT":3000
    },
    "staging":{
        "database":{
            connectionLimit : 100,
            host     : '127.0.0.1',
            user     : 'root',
            password : '**tap$$app**',
            database : 'tapapp_staging',
            debug    :  false
        },
        "redis":{
            secret_key : 'demo',
            host : '127.0.0.1',
            port:6379
        },
        "jwt":{
            secret_key : 'demo',
            exprireTime : '365 days'
        },
        "apn" :{
            publicKeyPath : "/opt/nodejs-workspace/taapapp-staging/taap-backend/certificates/APNsdev.pem",
            privateKeyPath : "/opt/nodejs-workspace/taapapp-staging/taap-backend/certificates/keydev.pem",
            passphrase : 'paxcel@123',
            isProduction : false
        },
        "URL_PREFIX":"/tapapp-staging",
        "PATH_SEPERATOR":"/",
        "ASSET_BASE_PATH" : '/opt/nodejs-workspace/taapapp-staging/taap-backend/asserts/',
        "PORT":4000
    },
    "production":{
        "database":{
            connectionLimit : 100,
            host     : '127.0.0.1',
            user     : 'root',
            password : '**tap$$app**',
            database : 'tapapp',
            debug    :  false
        },
        "redis":{
            secret_key : 'demo',
            host : '127.0.0.1',
            port:6379
        },
        "jwt":{
            secret_key : 'demo',
            exprireTime : '365 days'
        },
        "apn" :{
            publicKeyPath : "/opt/nodejs-workspace/taapapp-prod/taap-backend/certificates/APNs.pem",
            privateKeyPath : "/opt/nodejs-workspace/taapapp-prod/taap-backend/certificates/key.pem",
            passphrase : 'paxcel@123',
            isProduction : "yes"
        },
        "URL_PREFIX":"/tapapp",
        "PATH_SEPERATOR":"/",
        "ASSET_BASE_PATH" : '/opt/nodejs-workspace/taapapp-prod/taap-backend/asserts/',
        "PORT":3000
    }
}
exports = module.exports = config[env]
//exports = module.exports = config[process.env.NODE_ENV]; 