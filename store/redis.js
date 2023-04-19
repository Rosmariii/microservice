const redis = require('redis');
const config = require('../config');

let client;

async function initializeRedis() {
    client = redis.createClient({
        host: config.cacheService.dbHost,
        port: config.cacheService.dbPort,
        password: config.cacheService.dbPass,
        url: `redis://${config.cacheService.dbUser}:${config.cacheService.dbPass}@${config.cacheService.dbHost}:${config.cacheService.dbPort}`
    });
    
    client.on('error', (err) => {
        console.error(err);
    });

    await new Promise((resolve, reject) => {
        client.connect((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

    console.log('Conectado a REDIS');
}

async function list(table) {
    const value = await client.get(table);
    return JSON.parse(value);
}

async function get(table, id) {
    const value = await client.get(`${table}_${id}`);
    return JSON.parse(value);
}

async function upsert(table, data) {
    let key = table;
    if (data && data.id) {
        key += '_' + data.id;
    }
    await client.set(key, JSON.stringify(data));
    return true;
}

async function resetRedis() {
    // Limpia toda la cache
    await client.flushAll();
    //console.log('Cache limpia');
}

async function closeRedis() {
    if (client) {
        await client.quit();
        console.log('Conexión cerrada a REDIS');
    }
}

// Agrega el evento `beforeExit` para asegurarte de que el cliente Redis se cierre antes de que el proceso se cierre
process.on('beforeExit', async () => {
    await closeRedis();
});

setInterval(resetRedis, 10000);

// Inicializa el cliente Redis antes de usarlo
(async () => {
    await initializeRedis();

    // Limpia la cache cada 10 segundos
    setInterval(resetRedis, 10000);
})();

module.exports = {
    list,
    get,
    upsert,
};