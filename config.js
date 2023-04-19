module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || 'rosmari92',
        database: process.env.MYSQL_DB || 'new_schema',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    cacheService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3003,
        dbUser: process.env.REDIS_USER || 'default',
        dbHost: process.env.REDIS_HOST || 'redis-11876.c8.us-east-1-3.ec2.cloud.redislabs.com',
        dbPort: process.env.REDIS_PORT || 11876,
        dbPass: process.env.REDIS_PASS || 'pyDlQbbzXGaezxJAAcDVIwBXhiixgRYV',
    }
}